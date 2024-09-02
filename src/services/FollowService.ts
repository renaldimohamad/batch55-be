import db from "../libs/db";
import { IFollow } from "../types/follow";

export const follow = async (body: IFollow) => {
  const follow = await db.follow.create({
    data: {
      followersId: body.followersId,
      followingId: body.followingId,
    },
  });
  return follow;
};

export const unfollow = async (body: IFollow) => {
  const unfollow = await db.follow.deleteMany({
    where: {
      followersId: body.followersId,
      followingId: body.followingId,
    },
  });
  return unfollow;
};

export const checkAlreadyFollow = async (
  followersId: number,
  followingId: number
) => {
  const res = await db.follow.findFirst({
    where: {
      followersId,
      followingId,
    },
  });
  return res;
};

export const checkFollow = async (
  followersId: number,
  followingId: number[]
) => {
  const follow = await db.follow.findMany({
    where: {
      followersId,
      followingId: {
        in: followingId,
      },
    },
    select: {
      followingId: true,
    },
  });
  return follow;
};
