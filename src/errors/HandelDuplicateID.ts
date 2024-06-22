/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const HandleDuplicateID = (error: any): TGenericErrorResponse => {
  const matches = error.message.match(/"([^"]+)"/);
  let extractedMessage = "duplicate value";

  if (matches && matches[1]) {
    extractedMessage = matches[1];
  }

  const errorSource: TErrorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Property Already exist",
    errorSource,
  };
};

export default HandleDuplicateID;
