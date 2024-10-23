import express, { Request, Response } from "express";
import mainRoute from "./routes/mainRoute";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", mainRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("API Server is running");
});

app.listen(port, () => {
  console.log(`[SERVER] Server running at http://localhost:${port}`);
});
