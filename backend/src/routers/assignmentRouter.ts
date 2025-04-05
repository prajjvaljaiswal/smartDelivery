import express from "express";
import { assignOrder, getAssignmentMetrics, showAssignment } from "../controllers/assignmentController.js";

const assignmentRouter = express.Router();

assignmentRouter.post("/run", assignOrder);
assignmentRouter.get("/metrics", getAssignmentMetrics);
assignmentRouter.get("/",showAssignment)

export default assignmentRouter;
