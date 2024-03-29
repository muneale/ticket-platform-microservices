import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest, BadRequestError } from "@water3829-tickets/common";
import { User } from "../models/user";
import { PasswordManager } from "../services/password-manager";

const router = express.Router();

router.post("/api/users/signin", 
    [
        body("email")
            .isEmail()
            .withMessage("Email must be valid"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("You must supply a password")    
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            // It's better to not throw a 404 Not Found error
            // in order to avoid leaking information to
            // malicious users
            throw new BadRequestError("Invalid credentials");
        }

        const passwordsMatch = await PasswordManager.compare(
            existingUser.password,
            password
        )

        if (!passwordsMatch) {
            throw new BadRequestError("Invalid credentials");
        }

         // Generate JWT
    const userJwt = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email
        },
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);

    }
);

export { router as signinRouter };