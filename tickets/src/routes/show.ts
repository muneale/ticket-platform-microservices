import express, { Request, Response } from "express";
import { param } from "express-validator";
import { NotFoundError, validateRequest } from "@water3829-tickets/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", 
    [
        param("id")
            .not()
            .isEmpty()
            .withMessage("Ticket ID is required")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const ticket = await Ticket.findById(id);

        if (!ticket) {
            throw new NotFoundError();
        }

        res.send(ticket);
    }
);

export { router as showTicketRouter };