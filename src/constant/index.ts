export * from "./setting";
export * from "./type";
import { homedir, platform } from "os";
import { MUSIC_QUALITY } from "./setting";
import type { NativeModule } from "./type";
import { Uri } from "vscode";
import { join } from "path";

export const PLATFORM = platform();
export const PLAYER_AVAILABLE =
  PLATFORM === "win32" || PLATFORM === "linux" || PLATFORM === "darwin";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare function __non_webpack_require__(_: string): unknown;
export const NATIVE = __non_webpack_require__(
  join("..", "build", `${PLATFORM}.node`)
) as NativeModule;

export const ACCOUNT_KEY = "account";
export const COOKIE_KEY = "cookie";
export const BUTTON_KEY = "button";
export const VOLUME_KEY = "volume";
export const CHECK_KEY = "check";

export const SETTING_DIR = Uri.joinPath(Uri.file(homedir()), ".cloudmusic");
export const TMP_DIR = Uri.joinPath(SETTING_DIR, "tmp");
export const CACHE_DIR = Uri.joinPath(SETTING_DIR, "cache");
export const MUSIC_CACHE_DIR = Uri.joinPath(
  CACHE_DIR,
  "music",
  `${MUSIC_QUALITY}`
);
export const LYRIC_CACHE_DIR = Uri.joinPath(CACHE_DIR, "lyric");

export const ICON = {
  album: "$(circuit-board)",
  artist: "$(account)",
  comment: "$(comment)",
  description: "$(markdown)",
  fm: "$(radio-tower)",
  level: "$(graph)",
  like: "$(heart)",
  name: "$(link)",
  number: "$(symbol-number)",
  playlist: "$(list-unordered)",
  rankinglist: "$(list-ordered)",
  save: "$(diff-added)",
  unsave: "$(diff-removed)",
  add: "$(add)",
  search: "$(search)",
  similar: "$(library)",
  song: "$(zap)",
};
