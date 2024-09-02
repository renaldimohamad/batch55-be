import { Router } from "express";
import * as LikeController from "../controllers/LikeController";
import authorization from "../middlewares/authorization";

const likeRoute = Router();
likeRoute.post("/:postId", authorization, LikeController.Like);
likeRoute.delete("/unlike/:postId", authorization, LikeController.unlike);
likeRoute.get("/count/:postId", authorization, LikeController.countLike);
likeRoute.post("/check/:postId", authorization, LikeController.checkLike);

export default likeRoute;
