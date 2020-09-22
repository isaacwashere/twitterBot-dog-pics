export interface Twit {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  source: string;
  truncated: boolean;
  in_reply_to_status_id?: any | null;
  in_reply_to_status_id_str?: any | null;
  in_reply_to_user_id: number;
  in_reply_to_user_id_str: string;
  in_reply_to_screen_name: string;
  user: TwitUser;
  geo?: any | null;
  coordinates?: any | null;
  place?: any | null;
  contributors?: any | null;
  is_quote_status: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  entities: TwitEntities;
  favorited: boolean;
  retweeted: boolean;
  filter_level: string;
  lang: string;
  timestamp_ms: string;
}

export interface TwitUser {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location?: any | null;
  url?: any | null;
  description: string;
  translator_type: string;
  protected: boolean;
  verified: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  created_at: string;
  utc_offset?: any | null;
  time_zone?: any | null;
  geo_enabled: boolean;
  lang?: any | null;
  contributors_enabled: boolean;
  is_translator: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  default_profile: boolean;
  default_profile_image: boolean;
  following?: any | null;
  follow_request_sent?: any | null;
  notifications?: any | null;
}

export interface TwitEntities {
  hashtags?: any | null[] | any | null;
  urls?: any | null[] | any | null;
  user_mentions?: TwitUserMentionsEntityEntity[] | null;
  symbols?: any | null[] | any | null;
}

export interface TwitUserMentionsEntityEntity {
  screen_name: string;
  name: string;
  id: string;
  id_str: string;
  indices: number[];
}

export interface UnsplashImage {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  description?: null;
  alt_description: string;
  urls: UnsplashImageUrls;
  links: UnsplashImageLinks;
  categories?: null[] | null;
  likes: number;
  liked_by_user: boolean;
  current_user_collections?: null[] | null;
  sponsorship?: null;
  user: UnsplashUser;
  exif: UnsplashExif;
  location: UnsplashImageLocation;
  views: number;
  downloads: number;
}
export interface UnsplashImageUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
export interface UnsplashImageLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}
export interface UnsplashUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username?: null;
  portfolio_url?: null;
  bio: string;
  location: string;
  links: UnsplashUserLinks;
  profile_image: UnsplashUserProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
}
export interface UnsplashUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}
export interface UnsplashUserProfileImage {
  small: string;
  medium: string;
  large: string;
}
export interface UnsplashExif {
  make: string;
  model: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}
export interface UnsplashImageLocation {
  title?: null;
  name?: null;
  city?: null;
  country?: null;
  position: UnsplashImagePosition;
}
export interface UnsplashImagePosition {
  latitude?: null;
  longitude?: null;
}

export interface DogAPIImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: any[];
}

export interface DogCEOAPIImage {
  message: string;
  status: string;
}

export interface TwitMediaUploadData {
  media_id: number;
  media_id_string: string;
  size: number;
  expires_after_secs: number;
  image: { image_type: string; w: number; h: number };
}
