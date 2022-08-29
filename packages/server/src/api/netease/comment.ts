import { AccountState, OSCookie, resolveComment } from "./helper";
import { eapiRequest, weapiRequest } from "./request";
import { APISetting } from "../helper";
import type { NeteaseCommentType } from "@cloudmusic/shared";
import { NeteaseSortType } from "@cloudmusic/shared";
import type { NeteaseTypings } from "api";

const resourceTypeMap = [
  "R_SO_4_",
  "R_MV_5_",
  "A_PL_0_",
  "R_AL_3_",
  "A_DJ_1_",
  "R_VI_62_",
  "A_EV_2_",
];

export async function commentAdd(
  type: NeteaseCommentType,
  id: number,
  content: string
): Promise<boolean> {
  const tmpJar = AccountState.defaultCookie.cloneSync();
  const url = `${APISetting.apiProtocol}://music.163.com/weapi/resource/comments/add`;
  tmpJar.setCookieSync(OSCookie.android, url);
  return !!(await weapiRequest(
    `music.163.com/weapi/resource/comments/add`,
    { threadId: `${resourceTypeMap[type]}${id}`, content },
    tmpJar
  ));
}

export async function commentReply(
  type: NeteaseCommentType,
  id: number,
  content: string,
  commentId: number
): Promise<boolean> {
  const tmpJar = AccountState.defaultCookie.cloneSync();
  const url = `${APISetting.apiProtocol}://music.163.com/weapi/resource/comments/reply`;
  tmpJar.setCookieSync(OSCookie.android, url);
  return !!(await weapiRequest(
    `music.163.com/weapi/resource/comments/reply`,
    { threadId: `${resourceTypeMap[type]}${id}`, content, commentId },
    tmpJar
  ));
}

export async function commentFloor(
  type: NeteaseCommentType,
  id: number,
  parentCommentId: number,
  limit: number,
  time: number
): Promise<NeteaseTypings.CommentRet> {
  const res = await weapiRequest<{
    data: {
      totalCount: number;
      hasMore: boolean;
      comments: readonly NeteaseTypings.RawCommentDetail[];
    };
  }>("music.163.com/weapi/resource/comment/floor/get", {
    parentCommentId,
    threadId: `${resourceTypeMap[type]}${id}`,
    time,
    limit,
  });
  if (!res) return { totalCount: 0, hasMore: false, comments: [] };
  const {
    data: { totalCount, hasMore, comments },
  } = res;
  return {
    totalCount,
    hasMore,
    comments: comments.map(resolveComment),
  };
}

export async function commentLike(
  type: NeteaseCommentType,
  t: "like" | "unlike",
  id: number,
  commentId: number
): Promise<boolean> {
  const tmpJar = AccountState.defaultCookie.cloneSync();
  const url = `${APISetting.apiProtocol}://music.163.com/weapi/v1/comment/${t}`;
  tmpJar.setCookieSync(OSCookie.pc, url);
  return !!(await weapiRequest(
    `music.163.com/weapi/v1/comment/${t}`,
    { threadId: `${resourceTypeMap[type]}${id}`, commentId },
    tmpJar
  ));
}

export async function commentNew(
  type: NeteaseCommentType,
  id: number,
  pageNo: number,
  pageSize: number,
  sortType: NeteaseSortType,
  cursor: number | string
): Promise<NeteaseTypings.CommentRet> {
  const tmpJar = AccountState.defaultCookie.cloneSync();
  const url = `${APISetting.apiProtocol}://music.163.com/eapi/v2/resource/comments`;
  tmpJar.setCookieSync(OSCookie.pc, url);

  switch (sortType) {
    case NeteaseSortType.recommendation:
      cursor = (pageNo - 1) * pageSize;
      break;
    case NeteaseSortType.hottest:
      cursor = `normalHot#${(pageNo - 1) * pageSize}`;
      break;
  }
  const res = await eapiRequest<{
    data: {
      totalCount: number;
      hasMore: boolean;
      comments: readonly NeteaseTypings.RawCommentDetail[];
    };
  }>(
    "music.163.com/eapi/v2/resource/comments",
    {
      threadId: `${resourceTypeMap[type]}${id}`,
      pageNo,
      showInner: true,
      pageSize,
      cursor,
      sortType,
    },
    "/api/v2/resource/comments",
    tmpJar
  );
  if (!res) return { totalCount: 0, hasMore: false, comments: [] };
  const {
    data: { totalCount, hasMore, comments },
  } = res;
  return {
    totalCount,
    hasMore,
    comments: comments.map(resolveComment),
  };
}
