import z from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/userModel.js";

const emailSchema = z.string().email();
const passwordSchema = z
  .string()
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

export default async function (req, res) {
  const { user, email, password } = req.body;
  if (
    !emailSchema.safeParse(email).success ||
    !passwordSchema.safeParse(password).success
  )
    return res.status(400).json({ message: "Invalid email or password" });

  if (await User.findOne({ email }))
    return res.status(400).json({ messsage: "Email already exists" });

  if (await User.findOne({ user }))
    return res.status(400).json({ message: "Username already exists" });

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    user,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({
    message: "User created",
    token: "Bearer " + token,
  });
}
