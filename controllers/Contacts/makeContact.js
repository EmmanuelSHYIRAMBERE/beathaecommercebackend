import { contactReceivedEmail } from "../../middleware";
import { Contact } from "../../models";
import { catchAsyncError } from "../../utility";

export const makeContact = catchAsyncError(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  contactReceivedEmail(req.body.email, req.body.fullNames);

  res.status(201).json({
    message:
      "Dear valued user, your feedback has receiced. Thank you for connect with us.",
    data: { contact },
  });
});
