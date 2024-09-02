import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { IPosts } from "../types/post";
import { IUser } from "../types/user";

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
      comments: true,
      images: {
        select: {
          image: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
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
      comments: {
        include: {
          author: {
            select: {
              id: true,
              fullName: true,
              username: true,
              email: true,
              profile_pic: true,
            },
          },
        },
      },
      images: {
        select: {
          image: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });
};

export const findByUserId = async (userId: number) => {
  return await db.posts.findMany({
    where: { userId, parentId: null },
    // Join
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profile_pic: true,
        },
      },
      comments: true,
      images: {
        select: {
          image: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });
};

// export const create = async (post: IPosts) => {
//   const newPost = await db.posts.create({
//     data: {
//       ...post,
//       images: {
//         create: post.images.map((image) => ({ image: image.fieldname })),
//       },
//     },
//   });

//   return newPost;
// };

export const create = async (post: IPosts) => {
  const newPost = await db.posts.create({
    data: {
      ...post,
      images: {
        create:
          post.images &&
          post.images.map((image) => ({ image: image.filename })),
      },
    },
  });

  return newPost;
};

// export const create = async (post: Posts) => {
//   const newPost = await db.posts.create({ data: post });

//   return newPost;
// };

// const updateLikeInBackend = async (
//   postId: string,
//   userId: string,
//   isLiked: boolean
// ) => {
//   try {
//     await fetch(`/api/posts/${postId}/like`, {
//       method: isLiked ? "DELETE" : "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId }),
//     });
//   } catch (error) {
//     console.error("Failed to update like status", error);
//   }
// };

// export const update = (index: number, post: PostModels) => {
//   posts[index] = post;

//   return post;
// };

export const update = async (id: number, userUpdates: IUser) => {
  return await db.user.update({
    where: { id },
    data: {
      ...userUpdates,
      profile_pic: userUpdates.profile_pic ?? undefined,
    },
  });
};

export const remove = async (id: number) => {
  await db.posts.delete({ where: { id } });

  return "deleted";
};
