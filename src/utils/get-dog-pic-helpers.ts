require('es6-promise').polyfill();
require('isomorphic-fetch');
import { unsplash } from '../../src/index';
import { toJson } from 'unsplash-js';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { logger } from '../../src/index';
import { DOG_CEO_API_RANDOM, THE_DOG_API_URL } from '../../src/constants';
import { DogAPIImage, DogCEOAPIImage, UnsplashImage } from '../../src/interfaces';

export const getDogPicFromUnsplash = async (): Promise<string | null> => {
  return await unsplash.photos
    .getRandomPhoto({ query: 'dog' })
    .then(toJson)
    .then((unsplashImage: UnsplashImage) => {
      if (unsplashImage?.urls?.regular) return unsplashImage?.urls?.regular;
      logger.error('Unsplash API - Regular Image Url not found', { data: unsplashImage });
      return null;
    })
    .catch(error => {
      logger.error('Unsplash API - ERROR: ', { error: error.message });
      return null;
    });
};

export const getDogPicFromTheDogAPI = async (): Promise<string | null> => {
  return await axios
    .get(THE_DOG_API_URL)
    .then((response: AxiosResponse) => {
      const d: DogAPIImage[] = response.data;
      if (d[0]?.url) return d[0]?.url;
      logger.error('The Dog API - Image Url not found', { data: d });
      return null;
    })
    .catch(error => {
      logger.error('The Dog API - ERROR: ', { error: error.message });
      return null;
    });
};

export const getDogPicFromDogCEOAPI = async (): Promise<string | null> => {
  return await axios
    .get(DOG_CEO_API_RANDOM)
    .then((response: AxiosResponse) => {
      const d: DogCEOAPIImage = response.data;
      if (d.message) return d.message;
      logger.error('Dog CEO API - Image Url not found', { data: d });
      return null;
    })
    .catch((error: AxiosError) => {
      logger.error('Dog CEO API - ERROR: ', { error: error.message });
      return null;
    });
};
