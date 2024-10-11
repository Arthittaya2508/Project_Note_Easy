// routes/auth.ts
import express, { Request, Response } from "express";

const router = express.Router();

// Mock database of users
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

// Route for login
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

export default router;
