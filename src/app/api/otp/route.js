import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";

export async function POST(req, response) {
  try {
    const { email, enteredOTP } = await req.json();

    // console.log("email", email);
    // console.log("enteredOTP", enteredOTP);

    const otp = generateOTP();

    await sendMail("OTP VERIFICATION", email, otp);
    return NextResponse.json({ success: true, otp }, { status: 200 });
  } catch (e) {
    console.error("Server Down!! Could not send OTP", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function sendMail(subject, toEmail, otpText) {
  var transporter = nodemailer.createTransport({
    //service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
    } else {
      // console.log("Email Sent", info.response);
      return true;
    }
  });
}

function generateOTP() {
  const OTP_LENGTH = 6;
  const otp = randomInt(Math.pow(10, OTP_LENGTH - 1), Math.pow(10, OTP_LENGTH));
  return otp.toString().padStart(OTP_LENGTH, "0");
}
