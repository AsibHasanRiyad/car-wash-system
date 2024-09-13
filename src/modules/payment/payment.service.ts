import { SlotModel } from "../slot/slot.model";

const confirmationService = async (transactionId: string) => {
  const result = await SlotModel.findOneAndDelete(
    { transactionId },
    {
      isBooked: "booked",
    }
  );
  return result;
};

export const PaymentService = {
  confirmationService,
};
