import express from "express";
import routes from "./routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use("/", routes);

// app.get('/me', (req, res) => {
//     const address = req.headers['x-address'];
//     if (!address) {
//         return res.status(401).json({ error: 'Not authenticated' });
//     }
//     console.log("Address: ",address)
//     res.json({ address });
// });

app.listen(port, () => console.log(`Server running on ${port}`));