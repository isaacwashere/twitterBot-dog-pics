import { postTweetWithImage } from './post-tweet-with-image';
import { logger } from '../index';

export const replyWithPic = async (pic: string, replyStatusId: string, user: string) => {
  try {
    const message = getGreeting();
    await postTweetWithImage(pic, replyStatusId, user, message);
  } catch (e) {
    logger.error(e);
  }
};

const getGreeting = () => {
  const messages = ["Here's a dog pic for ya!", 'Here you go!', 'Just for you!'];
  const randomNum = Math.floor(Math.random() * messages.length) + 1;
  const index = randomNum - 1;
  return messages[index];
};
