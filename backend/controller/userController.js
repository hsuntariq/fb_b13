const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const generateOTP = () => {
  const random = Math.random() * 999999;
  const round = Math.round(random);
  return round;
};

const sendMail = (email, f_name, l_name, otp) => {
  // send mail

  // 1. creater a transporter / configurations

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // 2. what should be sent in the mail

  const options = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "OTP for account verification",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 10px; border: 1px solid #e0e0e0; overflow: hidden;">
            
            <!-- Header -->
            <div style="background-color: #72F703; padding: 20px; text-align: center;">
                <img src="https://gallerypng.com/wp-content/uploads/2024/05/facebook-logo-png-image.png" alt="App Logo" style="width: 100px; margin-bottom: 10px;">
                <h1 style="color: #0078F6; font-size: 24px; margin: 0;">Welcome to Our App!</h1>
            </div>

            <!-- Body -->
            <div style="padding: 20px; background-color: #f9f9f9;">
                <p style="font-size: 16px; color: #555;">
                    Assalam o Alaikum <b> ${f_name.toUpperCase()} ${l_name.toUpperCase()}!</b> We're thrilled to have you join us. To verify your account, please use the following OTP (One-Time Password):
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; font-size: 24px; padding: 10px 20px; background-color: #087CEA;color:white; border-radius: 5px;">${otp}</span>
                </div>
                <p style="font-size: 16px; color: #555;">
                    This OTP is valid for 10 minutes. If you did not request this, you can safely ignore this email.
                </p>
                <p style="font-size: 16px; color: #555;">Thank you for joining us!</p>
            </div>

            <!-- Footer -->
            <div style="background-color: #72F703; padding: 10px; text-align: center;">
                <p style="color: #0078F6; font-size: 14px; margin: 0;">© 2024 Our App. All rights reserved.</p>
                <p style="color: #0078F6; font-size: 14px; margin: 5px 0 0;">Follow us on <a href="#" style="color: #0078F6; text-decoration: underline;">Facebook</a> | <a href="#" style="color: #0078F6; text-decoration: underline;">Instagram</a></p>
            </div>
        </div>
    `,
  };

  // 3. send mail

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Email sent successfully");
    }
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { f_name, l_name, dob, gender, m_mail, password } = req.body;

  // check if user enters all the fields

  if (!f_name || !l_name || !dob || !gender || !m_mail || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  // encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // check if email exists

  const checkEmail = await userModel.findOne({
    m_mail,
  });

  if (checkEmail) {
    res.status(401);
    throw new Error("Email already exists");
  }

  // store otp
  const otp = generateOTP();

  // send the data to the database

  const createdUser = await userModel.create({
    f_name,
    l_name,
    dob,
    gender,
    m_mail,
    password: hashedPassword,
    otp,
  });

  sendMail(m_mail, f_name, l_name, otp);

  res.send(createdUser);
});

// login the user

const loginUser = asyncHandler(async (req, res) => {
  // get the data from the frontend
  const { m_mail, password } = req.body;

  // check if user exists in the database/app

  const checkEmail = await userModel.findOne({
    m_mail,
  });

  // throw an error if user email doesnt exists

  if (!checkEmail) {
    res.status(401);
    throw new Error("Invalid Email");
  }

  if (checkEmail && (await bcrypt.compare(password, checkEmail.password))) {
    res.send(checkEmail);
  } else {
    res.status(401);
    throw new Error("Invalid password");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
