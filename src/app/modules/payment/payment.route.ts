import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post("/confirmation", PaymentController.confirmationController);
router.post("/failed", PaymentController.failedPayment);

export const paymentRoutes = router;
