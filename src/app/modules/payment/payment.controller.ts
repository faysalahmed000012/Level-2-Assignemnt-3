import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";

const confirmationController = catchAsync(async (req, res) => {
  const transectionId = req.query.trnx;
  const result = await PaymentServices.confirmationService(
    transectionId as string
  );
  if (result) {
    res.redirect(`${config.client_url}/payment/success/${transectionId}`);
  }
});

const failedPayment = catchAsync(async (req, res) => {
  const transactionId = req.query.trnx;
  const result = await PaymentServices.failedPayment(transactionId as string);
  if (result) {
    res.redirect(`${config.client_url}/payment/failed`);
  }
});

export const PaymentController = {
  confirmationController,
  failedPayment,
};
