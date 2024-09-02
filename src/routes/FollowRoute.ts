import { Router } from "express";
import authorization from "../middlewares/authorization";
import * as followController from "../controllers/FollowController";

const followRoute = Router();

followRoute.post("/", authorization, followController.follow);
followRoute.post("/unfollow", authorization, followController.unfollow);
followRoute.post("/check", authorization, followController.checkFollow);

export default followRoute;
