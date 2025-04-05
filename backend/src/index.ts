import express from "express";
import connectDB from "./database/dbconnect.js";
import Partner from "./models/partner.js";
import { partnerRouter } from "./routers/partnerRouter.js";
import orderRouter from "./routers/orderRouter.js";
import assignmentRouter from "./routers/assignmentRouter.js";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/partner', partnerRouter)
app.use('/api/order', orderRouter)
app.use('/api/assignment', assignmentRouter)


connectDB()
  .then(() => {
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
