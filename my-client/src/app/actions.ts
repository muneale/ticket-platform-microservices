"use server"

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import axios from "axios";

type UserPayload = {
    id: string;
    email: string;
}

export interface User {
    currentUser: UserPayload | null;
}

export async function getUser(): Promise<User> {
    console.log("EXECUTED")
    const hostname = "http://ingress-nginx-srv"; // This works because I've set an ExternalService service on K8S config
    // const hostname = "http:/ingress-nginx.ingress-nginx.svc.cluster.local"; // This should be the real one
    // The syntax is always: http://<service-name>.<namespace>.svc.cluster.local
    try {
        const { data } = await axios.get(`${hostname}/api/users/currentuser`);
        return data as User;
    } catch (error) {
        return { currentUser: null };
    }
}