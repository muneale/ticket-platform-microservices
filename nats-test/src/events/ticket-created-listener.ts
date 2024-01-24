import { Message } from "node-nats-streaming";
import Listener from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = "payment-service";

    onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
        console.log('Event data!', data);

        console.log(`Ticket ${data.id} created`);

        msg.ack();
    }
}

export default TicketCreatedListener;
