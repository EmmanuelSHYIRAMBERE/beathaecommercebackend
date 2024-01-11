import { Parkings, Reservations } from "../../models";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

const PaypackJs = require("paypack-js").default;
require("dotenv").config();

const paypack = PaypackJs.config({
  client_id: process.env.packID,
  client_secret: process.env.packScret,
});
export const cashIn = catchAsyncError(async (req, res) => {
  const id = req.params.id;

  const reservation = await Reservations.findById({ _id: id });

  if (!reservation) {
    return new errorHandler(`Reservation with id: ${id} not found.`, 404);
  }

  const payableAmount = reservation.totalPrice;

  const response = await paypack.cashin({
    number: req.body.number,
    amount: payableAmount,
    environment: "production",
  });

  const slot = await Parkings.findOne({ _id: reservation.slotID });

  if (!slot) {
    return new errorHandler(`There's no slot found.`, 404);
  }

  slot.status = true;

  slot.save();

  res.status(200).json({
    status: "payment request sent to your phone number, please confirm it.",
    data: response.data,
    reserveDetails: reservation,
  });
});
export const cashOut = catchAsyncError(async (req, res) => {
  const response = await paypack.cashout({
    number: req.body.number,
    amount: req.body.amount,
    environment: "production",
  });
  res.status(200).json({
    status: "withdrawn successful",
    data: response.data,
  });
});

export const acountTransactions = catchAsyncError(async (req, res) => {
  const response = await paypack.transactions({ offset: 0, limit: 100 });
  res.status(200).json({
    status: "successful transactions",
    data: response.data,
  });
});

export const accountEvents = catchAsyncError(async (req, res) => {
  const response = await paypack.events({ offset: 0, limit: 100 });
  res.status(200).json({
    status: "successful events",
    data: response.data,
  });
});

export const accountInfo = catchAsyncError(async (req, res) => {
  const response = await paypack.me();
  res.status(200).json({
    status: "successful account info",
    data: response.data,
  });
});

export const callback = async (req, res) => {
  let info = req.body;
  console.log(info);
  // try {
  //   let info = req.body;
  //   console.log(info);

  //   const transactionStatus = info && info.data && info.data.status;
  //   let REF = info.data.ref;

  //   const checkRef = await paymentModel.findOne({ ref: REF });
  //   console.log(checkRef);

  //   // Check if checkRef is not undefined and has a 'ref' property
  //   if (info.data.ref) {
  //     const DBref = checkRef.ref;

  //     const updateUser = await userModel.findById({ _id: checkRef.UserID });
  //     console.log("update user" + updateUser);
  //     console.log("ref in db:", DBref);

  //     console.log(`compare in --db--${DBref}= --data--${REF}`);

  //     if (transactionStatus === "successful") {
  //       console.log("___👍👍👍👍👍👍👍👍👍👍");

  //       updateUser.accountStatus = "activated";
  //       const changeStatus = await updateUser.save();

  //       if (!changeStatus) {
  //         console.log("update user failed 😘😘😘" + updateUser);
  //       }
  //       console.log("update user failed 😘😘😘" + changeStatus);

  //       updateUser.paymentStatus = transactionStatus;
  //       const changePaymentStatus = await updateUser.save();

  //       if (!changePaymentStatus) {
  //         console.log("update failed for  payment status " + transactionStatus);
  //       }

  //       checkRef.Status = transactionStatus;
  //       const paymentStatus_model = await checkRef.save();

  //       if (!paymentStatus_model) {
  //         console.log("paymentStatus_model" + transactionStatus + " is not");
  //       }
  //       console.log("paymentStatus_model" + paymentStatus_model);
  //       console.log("video id 💕💕💕" + checkRef.videoID);

  //       if (checkRef.videoID) {
  //         const getVideoToUpdate = await videos.findById(checkRef.videoID);
  //         getVideoToUpdate.status = "Paid";
  //         const VDupdate = await getVideoToUpdate.save();

  //         console.log("video updated for video " + VDupdate);
  //       }
  //       return res.json(paymentStatus_model);
  //     } else {
  //       console.log(
  //         "transaction failed-----😒😒😒😒😒😒😒" + updateUser.accountStatus
  //       );

  //       // const forpaymentStatus_fail = await userModel.findOneAndUpdate(
  //       //   { _id: result.UserID },
  //       //   { $set: { paymentStatus: transactionStatus } },
  //       //   { new: true }
  //       // );

  //       updateUser.accountStatus = "not active";
  //       const to_Not_active = await updateUser.save();

  //       if (!to_Not_active) {
  //         console.log("not changed to not active");
  //       }

  //       checkRef.Status = transactionStatus;
  //       // checkRef.Status = "hinduka status";
  //       const paymentStatus_model = await checkRef.save();

  //       if (!paymentStatus_model) {
  //         console.log("paymentStatus_model" + transactionStatus + " is not");
  //       }
  //       console.log(
  //         "paymentStatus_model done successfully" + paymentStatus_model
  //       );
  //       return res.json(paymentStatus_model);
  //     }
  //   } else {
  //     // Handle the case where checkRef or checkRef.ref is undefined
  //     console.log("checkRef is undefined for userinfo");
  //     return res.json({ msg: "checkRef is undefined for" });
  //   }
  // } catch (error) {
  //   res.status(503).json({ error: error.message });
  // }
  res.status(200).json(info);
};
