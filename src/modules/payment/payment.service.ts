import { SlotModel } from "../slot/slot.model";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (transactionId: string) => {
  //   console.log(transactionId, "inside service");
  const verifyResponse = await verifyPayment(transactionId);
  // console.log(verifyResponse);
  let result;
  if (verifyResponse.pay_status === "successful") {
    result = await SlotModel.findOneAndUpdate(
      { transactionId },
      { isBooked: "booked" },
      { new: true }
    );
    //   console.log(result);
  }
  return result;
};

export const PaymentService = {
  confirmationService,
};
