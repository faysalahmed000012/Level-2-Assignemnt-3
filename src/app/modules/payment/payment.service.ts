import { Booking } from "../booking/booking.model";

const confirmationService = async (id: string) => {
  const update = await Booking.findOneAndUpdate(
    { tranId: id },
    { isBooked: "confirmed" },
    { new: true }
  );
  return update;
};

const failedPayment = async (id: string) => {
  const result = await Booking.deleteOne({ tranId: id });
  return result;
};

export const PaymentServices = {
  confirmationService,
  failedPayment,
};
