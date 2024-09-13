import { SlotModel } from "../slot/slot.model";

const confirmationService = async (transactionId: string) => {
  //   console.log(transactionId, "inside service");
  const result = await SlotModel.findOneAndUpdate(
    { transactionId },
    { isBooked: "booked" },
    { new: true }
  );
  //   console.log(result);
  return result;
};

export const PaymentService = {
  confirmationService,
};
