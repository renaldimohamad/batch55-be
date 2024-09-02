import { User } from "@prisma/client";
import db from "../libs/db";

export const findAll = async (userId: number) => {
  return await db.user.findMany({
    where: {
      NOT: { id: userId },
    },

    select: {
      id: true,
      username: true,
      profile_pic: true,
      fullName: true,
    },
  });
};

// export const findById = async (id: number) => {
//   return await db.user.findFirst({
//     where: { id },
//     select: {
//       id: true,
//       username: true,
//       profile_pic: true,
//       fullName: true,
//     },
//   });
// };

export const findById = async (id: number) => {
  return await db.user.findFirst({
    where: {
      id,
    },
  });
};
console.log("find by id", findById);

// export const findSearch = async (search: string) => {
//   return await db.user.findMany({
//     where: {
//       username: {
//         startsWith: search,
//         mode: "insensitive",
//       },
//     },

//     select: {
//       id: true,
//       username: true,
//       profile_pic: true,
//       fullName: true,
//     },
//   });
// };

export const findByUsername = async (username: string) => {
  return await db.user.findMany({
    where: {
      username: {
        contains: username,
      },
    },
  });
};

export const update = async (id: number, user: User) => {
  return await db.user.update({
    where: { id },
    data: user,
    select: {
      id: true,
      username: true,
      profile_pic: true,
      fullName: true,
    },
  });
};

export const remove = async (id: number) => {
  return await db.user.delete({ where: { id } });
};
