import type { ExtensionContext } from "vscode";

export type PlaylistItem = {
  description: string | null;
  id: number;
  name: string;
  playCount: number;
  subscribedCount: number;
  trackCount: number;
  creator: UserDetail;
};

export interface RawPlaylistItem extends PlaylistItem {
  bookCount?: number;
  copywriter?: string;
  userId?: number;
}

export type Artist = {
  name: string;
  id: number;
  alias: string[];
  briefDesc: string;
  albumSize: number;
  musicSize: number;
};

export type SongsItem = {
  name: string;
  id: number;
  dt: number;
  alia: string[];
  ar: { id: number; name: string }[];
  al: { id: number; name: string; picUrl: string };
};

export type AnotherSongItem = {
  name: string;
  id: number;
  duration: number;
  alias: string[];
  artists: { id: number; name: string }[];
  album: { id: number; name: string; picUrl: string };
};

export type AlbumsItem = {
  artists: Artist[];
  alias: string[];
  company: string;
  description: string;
  name: string;
  id: number;
};

export type SongDetail = {
  id: number;
  url: string;
  md5: string;
};

export type UserDetail = {
  userId: number;
  nickname: string;
  signature: string;
  followeds: number;
  follows: number;
  avatarUrl: string;
};

export type SimplyUserDetail = {
  userId: number;
  nickname: string;
  avatarUrl: string;
};

export type TrackIdsItem = {
  id: number;
  v: number;
  at: number;
};

export type LruCacheValue = {
  integrity: string;
  size: number;
};

export type Lyric = {
  index: number;
  delay: number;
  time: number[];
  text: string[];
};

export type LyricData = {
  time: number[];
  text: string[];
};

export type RawCommentDetail = {
  user: SimplyUserDetail;
  commentId: number;
  content: string;
  time: number;
  likedCount: number;
  liked: boolean;
  beReplied?: {
    beRepliedCommentId: number;
    content: string;
    user: SimplyUserDetail;
  }[];
  showFloorComment?: {
    replyCount: number;
  };
};

export type CommentDetail = {
  user: SimplyUserDetail;
  commentId: number;
  content: string;
  time: number;
  likedCount: number;
  liked: boolean;
  replyCount: number;
  beReplied?: {
    beRepliedCommentId: number;
    content: string;
    user: SimplyUserDetail;
  };
};

export type NativePlayer = {};

export interface Player {
  item: SongsItem;
  pid: number;
  time: number;
  init(context: ExtensionContext): void;
  stop(): void;
  load(url: string, pid: number, item: SongsItem): void;
  togglePlay(): void;
  volume(level: number): Promise<void>;
}

export interface NativeModule {
  startKeyboardEvent(callback: (res: string) => void): void;

  playerEmpty(player: NativePlayer): boolean;
  playerLoad(player: NativePlayer, url: string): boolean;
  playerNew(): NativePlayer;
  playerPause(player: NativePlayer): void;
  playerPlay(player: NativePlayer): boolean;
  playerPosition(player: NativePlayer): number;
  playerSetVolume(player: NativePlayer, level: number): void;
  playerStop(player: NativePlayer): void;
}

export const enum SortType {
  recommendation = 1,
  hottest = 2,
  latest = 3,
}
