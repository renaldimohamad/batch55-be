import { Router } from "express";
import * as authController from "../controllers/AuthController";
import authorization from "../middlewares/authorization";
const authRoute = Router();

authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);

authRoute.get("/me", authorization, authController.checkAuth);

authRoute.put("/:user_id", authController.updateProfile);

// authRoute.post("/search", authController.searchUsersHandler);

export default authRoute;
