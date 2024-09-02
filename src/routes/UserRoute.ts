import { Router } from "express";
import * as userController from "../controllers/UserController";

const userRoute = Router();

userRoute.post("/", userController.findAll);

userRoute.get("/:search", userController.findById);

userRoute.patch("/:id", userController.update);

userRoute.delete("/:id", userController.remove);

userRoute.get("/search/:username", userController.findByUsername);

export default userRoute;
