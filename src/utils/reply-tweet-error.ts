import { logger, twitter } from '../index';

export const replyWithError = async (replyStatusId: string, user: string) => {
  try {
    twitter.post(
      'statuses/update',
      {
        in_reply_to_status_id: replyStatusId,
        status: `@${user} My bad, I couldn't find a dog pic. Mention me again and I'll try again.`,
      },
      function (_error, _data, _response) {
        logger.debug(`Replied to @${user} with error...`);
      }
    );
  } catch (error) {
    logger.error(JSON.stringify(error));
  }
};
