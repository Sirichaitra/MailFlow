import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import templateRoutes from "./routes/templateRoutes";
import customerRoutes from "./routes/customerRoutes";
import segmentRoutes from "./routes/segmentRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import campaignRoutes from "./routes/campaignRoutes";
import emailRoutes from "./routes/emailRoutes";

const app = express();


// ===============================
// CORS
// ===============================

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options(/.*/, cors(corsOptions));


// ===============================
// Middleware
// ===============================

app.use(express.json());


// ===============================
// Request Logger
// ===============================

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});


// ===============================
// Home
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "MailFlow API is running",
  });
});


// ===============================
// Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/templates", templateRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/segments", segmentRoutes);

app.use("/api/campaigns", campaignRoutes);

app.use("/api/email", emailRoutes);

app.use("/api/analytics", analyticsRoutes);


export default app;