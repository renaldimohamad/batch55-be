import { User } from "@prisma/client";
import db from "../libs/db";
import { IUserRegister } from "../types/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ERROR from "../utlis/constants/ERROR_LIST";
import { query } from "express";

export const login = async (username: string, password: string) => {
  const existedUser = await db.user.findFirst({
    where: {
      OR: [{ email: username }, { username: username }],
    },
  });

  if (!existedUser) {
    throw new Error(ERROR.AUTH_NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(password, existedUser.password);

  if (!isMatch) {
    throw new Error(ERROR.AUTH_NOT_FOUND);
  }

  const token = jwt.sign(existedUser, process.env.SECRET_KEY! || "secret", {
    expiresIn: "1d",
  });

  return token;
};

export const register = async (user: IUserRegister): Promise<User | string> => {
  const existedUser = await db.user.findFirst({
    where: {
      username: user.username,
    },
  });

  if (existedUser) {
    throw new Error("Username already exist");
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(user.password, 10);

  user.password = hashedPassword;

  const newUser = await db.user.create({
    data: user,
  });

  return newUser;
};

// Update / EditProfile
export const update = async (user_id: number, body: IUserRegister) => {
  console.log("check Service");

  const updateProfile = await db.user.update({
    where: {
      id: user_id,
    },
    data: {
      fullName: body.fullName,
      username: body.username,
      bio: body.bio,
    },
  });

  console.log("cek");

  return updateProfile;
};

// Search Account
export const searchUsers = async (query: string) => {
  const user = await db.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return user;
};
