import express from "express";
const router = express.Router();
import signupController from "../controllers/signupController.js";

router.route('/').post(signupController.signUp);


export default router;
