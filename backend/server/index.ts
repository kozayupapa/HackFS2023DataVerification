import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

import connectDB from "./db/connect";

if (Boolean(process.env.RUN_MONITOR)) {
  const { Worker } = require("worker_threads");
  new Worker(__dirname + "/worker/index.js");
}
//get routes
import dataOneRouter from "./routes/dataOne";
import reviewrouter from "./routes/reviewRoutes";
import datasetRouter from "./routes/dataSetRoutes";
import dataListRouter from "./routes/dataListRoutes";

//error handler
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

//cors setup
import cors from "cors";

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Data graph is set");
});
//routes
app.use("/api/v1/dataOne", dataOneRouter);
app.use("/api/v1/review", reviewrouter);
app.use("/api/v1/dataset", datasetRouter);
app.use("/api/v1/datalist", dataListRouter);

//error middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

//start server
const start = async () => {
  try {
    await connectDB(`${process.env.MONGO_URI}`);
    app.listen(port, () =>
      // tslint:disable-next-line:no-console
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
