import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

const allowedOrigins = ["https://level-2-assignment-5-client.vercel.app"];

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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
