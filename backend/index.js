import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cookieParser());
app.use(bodyParser.json());

const allowedOrigins=["http://localhost:3000","http://localhost:4000"]
connectDB();
app.use(cors({
  origin: allowedOrigins, 
  credentials: true, // Allow cookies and authentication headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
}));

app.use("/uploads", express.static("uploads"));
app.use("/", router);

app.listen(port, () => console.log(`Server running on ${port}`));