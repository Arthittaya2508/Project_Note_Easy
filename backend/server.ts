// server.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", authRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
