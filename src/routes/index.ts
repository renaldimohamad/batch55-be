import authRoute from "./AuthRoute";
import postRoute from "./PostRoute";
import { Router } from "express";
// import repliesRoute from "./RepliesRoutes";
import userRoute from "./UserRoute";
import likeRoute from "./LikeRoute";
import followRoute from "./FollowRoute";

const route = Router();

route.use("/posts", postRoute);
route.use("/auth", authRoute);
// route.use("/reply", repliesRoute);
route.use("/users", userRoute);
route.use("/like", likeRoute);
route.use("/follow", followRoute);

export default route;
