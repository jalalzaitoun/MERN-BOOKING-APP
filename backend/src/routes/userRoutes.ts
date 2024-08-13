import express, { Request, Response } from "express";
import User from "../Models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();
// /api/users/register
router.post(
  "/register",
  [
    check("firstName", "FirstName is required").isString(),
    check("lastName", "lastName is required").isString(),
    check("email", "email is required").isEmail(),
    check("password", "password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",

        maxAge: 86400000,
      });
      return res.status(200).send({ message: "user registeres ok" });
    } catch (error) {
      console.log(error);

      res.status(500).send({ messahe: "Something went wrong" });
    }
  }
);

export default router;
