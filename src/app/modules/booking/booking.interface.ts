import { Types } from "mongoose";

export default interface IBooking {
  date: string;
  startTime: string;
  endTime: string;
  user: any;
  facility: Types.ObjectId;
  payableAmount: number;
  tranId: string;
  isBooked: "confirmed" | "unconfirmed" | "canceled";
}
