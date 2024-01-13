import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
    const token = req.session?.jwt;
    
    // If there is no token, send back null
    if (!token) {
        return res.send({ currentUser: null });
    }

    // If there is a token, verify it
    try {
        const payload = jwt.verify(token, process.env.JWT_KEY!);
        res.send({ currentUser: payload });
    } catch (error) {
        res.send({ currentUser: null });
    }
});

export { router as currentUserRouter };