import { Contact } from "../../models";
import { catchAsyncError } from "../../utility";

export const makeContact = catchAsyncError(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    message: "Dear user, your response has receiced. Thank you for contact us.",
    data: { contact },
  });
});
