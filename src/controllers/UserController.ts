import * as userService from "../services/UserService";
import { Request, Response } from "express";

export const findAll = async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll(req.body.userId);
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const findById = async (req: Request, res: Response) => {
  const users = await userService.findById(parseInt(req.params.id));
  res.json(users);
};

export const update = (req: Request, res: Response) => {
  const user = userService.update(parseInt(req.params.id), req.body);
  res.json(user);
};

export const remove = (req: Request, res: Response) => {
  const user = userService.remove(parseInt(req.params.id));
  res.json(user);
};

export async function findByUsername(req: Request, res: Response) {
  console.log(req.params);
  const user = await userService.findByUsername(req.params.username);
  res.json(user);
}


// export const findInput = async (req: Request, res: Response) => {
//   try {
//     const { query } = req.query;
//     if (!query) {
//       return res.send({
//         res: "Query is required",
//         message: "Query is required",
//       });
//     }

//     const users = await userService.findSearch(query as string);

//     if (!users) {
//       return res.send({
//         res: "Query is required",
//         message: "Query is required",
//       });
//     }

//     res.json(users);
//   } catch (error) {
//     console.log(error);
//   }
// };
