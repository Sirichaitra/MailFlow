import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import templateRoutes from "./routes/templateRoutes";

const app = express();

app.use(cors());

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "MailFlow API is running",
    });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Email template routes
app.use("/api/templates", templateRoutes);

export default app;