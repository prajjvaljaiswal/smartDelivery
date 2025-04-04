import express from "express";
import connectDB from "./database/dbconnect.js";
import Partner from "./models/partner.js";
import { partnerRouter } from "./routers/partnerRouter.js";
const app = express();
const port = 3000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/partner", async (req, res) => {
  try {
    const partner = await Partner.find({});
    if (partner.length === 0) throw new Error("Partner not found");
    res.status(200).json(partner);
  } catch (error: Error | any) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/partner', partnerRouter)

connectDB()
  .then(() => {
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
