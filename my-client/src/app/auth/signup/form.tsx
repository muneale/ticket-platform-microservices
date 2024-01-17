"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import Errors from "@/components/errors";
import createUser from "./actions";

export default function Form() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  return (
    <form action={async formData => {
      setErrors([]);
      const state = await createUser(formData);
      if (state?.errors) {
        setErrors(state.errors);
      } else {
        router.push('/');
      }
    }}>
      <h1 className="text-3xl">Signup</h1>
      <div className="form-group my-3">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          className="form-control"
          name="email"
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input  
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="exampleInputPassword1"
          name="password"
        />
      </div>
      <Errors errors={errors} />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}