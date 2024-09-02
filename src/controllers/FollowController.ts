import errorHandler from "../utlis/errorHandler";
import * as followService from "../services/FollowService";
import { Request, Response } from "express";

export const follow = async (req: Request, res: Response) => {
  try {
    const existedFollow = await followService.checkAlreadyFollow(
      req.body.followersId,
      req.body.followingId
    );
    if (existedFollow) {
      return res.status(400).send("Already Followed");
    }
    const follow = await followService.follow(req.body);
    res.json(follow);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const unfollow = async (req: Request, res: Response) => {
  try {
    const unfollow = await followService.unfollow(req.body);
    res.json(unfollow);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const checkFollow = async (req: Request, res: Response) => {
  const { followersId, users } = req.body;
  if (!followersId || !Array.isArray(users)) {
    return res.status(400).send("invalid input");
  }

  try {
    const followingId = users.map((user) => user.id);
    const followStatuses = await followService.checkFollow(
      followersId,
      followingId
    );
    const followedIdSet = new Set(
      followStatuses.map((follow) => follow.followingId)
    );

    const followStatusMap = users.map((user) => ({
      ...user,
      isFollowing: followedIdSet.has(user.id),
    }));
    res.json(followStatusMap);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};
