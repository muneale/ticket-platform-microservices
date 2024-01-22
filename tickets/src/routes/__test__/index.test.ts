import request from "supertest";
import { app } from "../../app";

function createTicket(title: string, price: number) {
    return request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title,
            price
        });
}

it("can fetch a list of tickets", async () => {
    await createTicket("concert", 20);
    await createTicket("another concert", 30);
    await createTicket("final concert", 40);

    const response = await request(app)
        .get("/api/tickets")
        .send({})
        .expect(200)
    
    expect(response.body.length).toEqual(3);
})