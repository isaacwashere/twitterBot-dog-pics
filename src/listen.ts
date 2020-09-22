import { logger, twitter } from './index';
import { TWITTER_MENTION } from './constants';
import { Twit } from './interfaces';
import { handleGetDogPic } from './utils/handle-get-dog-pic';
import { replyWithPic } from './utils/reply-tweet-dog-pic';
import { replyWithError } from './utils/reply-tweet-error';

export const listen = () => {
  const mentionStream = twitter.stream('statuses/filter', { track: TWITTER_MENTION });
  mentionStream.on('tweet', async (tweet: Twit) => {
    logger.debug('\n\nTWEET IS: ', tweet);
    logger.debug(`@${tweet.user.screen_name} wants a dog pic...`);
    const dogPic = await handleGetDogPic();
    dogPic
      ? await replyWithPic(dogPic, tweet.id_str, tweet.user.screen_name)
      : await replyWithError(tweet.in_reply_to_status_id, tweet.user.screen_name);
  });
};
