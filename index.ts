import express from "express";
import dotenv from "dotenv";
import route from "./src/routes";
import db from "./src/libs/db";
import cors from "cors";
import exp from "constants";
import likeRouter from "./src/routes/LikeRoute";

// inisialisasi dotenv
dotenv.config();

// inisialisasi express
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // agar server tidak di blok browser
app.use("/uploads", express.static("src/uploads")); // --> directory static

//routes
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World, ini adalah aplikasi express!!");
});

app.use(route);

app.use("/api", likeRouter);

app.listen(port, async () => {
  try {
    await db.$connect();
    console.log("Express running on port " + port);
  } catch (error) {
    await db.$disconnect();
  }
});
