import { logger, twitter } from './index';
import { USERNAME } from './constants';
import { Twit, TwitUserMentionsEntityEntity } from './interfaces';
import { handleGetDogPic } from './utils/handle-get-dog-pic';
import { replyWithPic } from './utils/reply-tweet-dog-pic';
import { replyWithError } from './utils/reply-tweet-error';

export const listen = () => {
  const mentionStream = twitter.stream('statuses/filter', { track: USERNAME });

  mentionStream.on('tweet', async (tweet: Twit) => {
    const botWasMentioned = determineIfMentioned(tweet);
    logger.debug('\n\nTWEET IS: ', tweet);

    if (!botWasMentioned) {
      logger.info(`@${tweet.user.screen_name} did not mention the bot.`);
      return;
    }

    logger.debug(`@${tweet.user.screen_name} wants a dog pic...`);
    const dogPic = await handleGetDogPic();
    dogPic
      ? await replyWithPic(dogPic, tweet.id_str, tweet.user.screen_name)
      : await replyWithError(tweet.in_reply_to_status_id, tweet.user.screen_name);
  });
};

const determineIfMentioned = (tweet: Twit) => {
  const mentions = tweet.entities.user_mentions;
  if (!mentions) return false;

  return mentions.reduce((acc: boolean, currVal: TwitUserMentionsEntityEntity) => {
    if (currVal.screen_name === USERNAME) {
      acc = true;
      return acc;
    }
    return acc;
  }, false);
};
