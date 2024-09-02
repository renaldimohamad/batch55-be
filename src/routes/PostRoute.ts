import { Router } from "express";
import * as postController from "../controllers/PostController";
import authorization from "../middlewares/authorization";
import upload from "../middlewares/fileUpload";
const postRouter = Router();

postRouter.get("/", authorization, postController.findAll);

postRouter.get("/:id", authorization, postController.findById);

postRouter.get("/byUser/:id", authorization, postController.findByUserId);

postRouter.post(
  "/",
  authorization,
  upload.array("image"),
  postController.create
);
postRouter.put("/:id", authorization, postController.update);

postRouter.delete("/:id", authorization, postController.remove);

export default postRouter;
