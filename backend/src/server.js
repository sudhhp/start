import express from "express";
import noteRoutes from "./routes/noteRoutes.js"; // Correct import path
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
// Load environment variables
dotenv.config();

// Connect to the database

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
// Middleware to use the router for "/api/notes"
app.use(express.json()); //to be access to req.body parameter
app.use((req, res, next) => {
  console.log(`req method is ${req.method} and req URL is ${req.url}`);
  next();
});

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(rateLimiter);
app.use("/api/notes", noteRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

connectDB().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log("server started on port:", PORT);
  });
});
