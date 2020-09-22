import Twit = require('twit');
import { listen } from './listen';
import { createWinstonLogger } from './winston/winston';
import { createTwitterClient } from './clients/create-twitter-client';
import { createUnsplashClient } from './clients/create-unsplash-client';

// Create Winston Logger
export const logger = createWinstonLogger();
logger.info('Winston logger initialized...');

// Init Twit
export const twitter = createTwitterClient();
logger.info('Twit Package started...');

// Connect to Unsplash
export const unsplash = createUnsplashClient();
logger.info('Unsplash API Connected...');

listen();
