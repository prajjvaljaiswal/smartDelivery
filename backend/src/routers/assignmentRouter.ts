import express from "express";
import { assignOrder, getAssignmentMetrics } from "../controllers/assignmentController.js";

const assignmentRouter = express.Router();

assignmentRouter.post("/run", assignOrder);
assignmentRouter.get("/metrics", getAssignmentMetrics);

export default assignmentRouter;
