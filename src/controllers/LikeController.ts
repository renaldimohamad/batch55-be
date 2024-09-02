import * as likeservice from "../services/LikeService";
import { Request, Response } from "express";
import errorHandler from "../utlis/errorHandler";

export const Like = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10);

  const { userId } = req.body;
  try {
    const Like = await likeservice.createLike({ postId, userId });
    res.json(Like);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const unlike = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10);
  const { userId } = req.body;
  try {
    const unlike = await likeservice.deleteLike({ postId, userId });
    res.json(unlike);
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const countLike = async (req: Request, res: Response) => {
  try {
    const post = await likeservice.countLike(parseInt(req.params.postId));
    const likescount = post === null ? 0 : post.likes.length;
    res.json({ likes: likescount });
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};

export const checkLike = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const postId = parseInt(req.params.postId, 10);
  try {
    const check = await likeservice.checkLike({ postId, userId });
    if (check) {
      res.json({ liked: true });
    } else {
      res.json({ liked: false });
    }
  } catch (error) {
    errorHandler(res, error as unknown as Error);
  }
};
