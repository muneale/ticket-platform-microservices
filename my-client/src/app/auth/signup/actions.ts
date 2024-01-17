"use server"

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import axios from 'axios'

export default async function createUser(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')
    // Create user
    try {
        const response = await axios.post('http://ingress-nginx-srv/api/users/signup', {
          email,
          password
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Host': 'platform.ticketing.dev'
          }
        });
        console.log("data: ", response.headers);
        console.log("cookies: ", cookies().toString());
        // cookies().set('session', data.session);
    } catch (error: any) {
        console.log("errors: ", error.response?.data.errors);
        return {
            errors: error.response?.data.errors
        }
    }
  }