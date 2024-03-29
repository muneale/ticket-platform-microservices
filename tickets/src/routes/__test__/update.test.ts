import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("returns a 404 if the provided id does not exist", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set("Cookie", global.signup())
        .send({
            title: "concert",
            price: 20
        })
        .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "concert",
            price: 20
        })
        .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({
            title: "concert",
            price: 20
        });
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", global.signup())
        .send({
            title: "new concert",
            price: 100
        })
        .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
    const cookie = global.signup();
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({
            title: "concert",
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "",
            price: 20
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "concert",
            price: -10
        })
        .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
    const cookie = global.signup();
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({
            title: "concert",
            price: 20
        });
    
    const updatedResponse = await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "new concert",
            price: 100
        })
        .expect(200);

    expect(updatedResponse.body.title).toEqual("new concert");
    expect(updatedResponse.body.price).toEqual(100);

});