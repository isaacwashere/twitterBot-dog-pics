import { twitter, logger } from '../index';
import imageToBase64 from 'image-to-base64';
import { replyWithError } from './reply-tweet-error';
import { TwitMediaUploadData } from 'src/interfaces';

export const postTweetWithImage = async (
  pic: string,
  replyStatusId: string,
  user: string,
  message: string
) => {
  const b64content = await imageToBase64(pic)
    .then(response => {
      return response.toString();
    })
    .catch(error => {
      logger.error(error);
      throw new Error(JSON.stringify(error));
    });

  twitter.post('media/upload', { media_data: b64content }, async function (
    uploadError,
    data: TwitMediaUploadData,
    _response
  ) {
    const mediaIdStr: string = data.media_id_string;
    const altText = 'doggo pic';
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
    if (uploadError) {
      await replyWithError(replyStatusId, user);
      throw new Error(JSON.stringify(uploadError));
    }

    twitter.post('media/metadata/create', meta_params, async function (
      createError,
      _data,
      _response
    ) {
      const params = {
        status: `@${user} ${message}`,
        media_ids: [mediaIdStr],
        in_reply_to_status_id: replyStatusId,
      };
      logger.debug('Params before posting tweet: ', { params });

      if (createError) {
        await replyWithError(replyStatusId, user);
        throw new Error(JSON.stringify(createError));
      }

      twitter.post('statuses/update', params, async function (postError, _data, _response) {
        if (postError) {
          await replyWithError(replyStatusId, user);
          throw new Error(JSON.stringify(postError));
        }
        logger.info(`Replied to: @${user}`);
      });
    });
  });
};
