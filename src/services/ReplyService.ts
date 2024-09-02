import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { Posts } from "@prisma/client";

const posts: PostModels[] = [];

export const findAll = async () => {
  return await db.posts.findMany({
    // join table
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
    },
  });
};

export const findById = async (id: number) => {
  return await db.posts.findFirst({
    where: { id },

    // join table
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
    },
  });
};

export const create = async (post: Posts) => {
  const newPost = await db.posts.create({ data: post });

  return newPost;
};

export const update = (index: number, post: PostModels) => {
  posts[index] = post;
  return post;
};

export const remove = async (id: number) => {
  await db.posts.delete({ where: { id } });

  return "deleted";
};
