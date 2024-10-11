// server.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth"; // This works if baseUrl is set correctly

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Use router for authentication
app.use("/api", authRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
