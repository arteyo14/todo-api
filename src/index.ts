import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoute";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`[SERVER] Server running at http://localhost:${port}`);
});
