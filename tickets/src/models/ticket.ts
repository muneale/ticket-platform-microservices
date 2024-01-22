import { Document, model, Model, Schema } from "mongoose";

// An interface that describes the properties
// that are required to create a new User
interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

// An interface that describes the properties
// that User Model has
interface TicketModel extends Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

// An interface that describes the properties
// that a User Mocument has
interface TicketDoc extends Document {
    title: string;
    price: number;
    userId: string;
    // createdAt: string;
    // updatedAt: string;
}

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}

const Ticket = model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };