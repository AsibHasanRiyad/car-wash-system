import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cleancarco.vercel.app"],
    credentials: true,
  })
);

//application route
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Car Wash!");
});
// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
