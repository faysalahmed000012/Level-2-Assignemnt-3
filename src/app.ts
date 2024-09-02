import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

const allowedOrigins = [
  "https://level-2-assignment-5-client.vercel.app",
  "https://66d5dd1761a09e0992640ec4--exquisite-platypus-75cdf3.netlify.app/",
];

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://level-2-assignment-5-client.vercel.app"],
    credentials: true,
  })
);

// application routes
app.use("/api", router);

const test = async (req: Request, res: Response) => {
  res.send("Welcome to the Assignment");
};
app.get("/", test);

// globalErrorHandler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
