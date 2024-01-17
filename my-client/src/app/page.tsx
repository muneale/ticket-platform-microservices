"use client"

import { useEffect, useState } from "react";
import { User, getUser } from "./actions";

export default function Home() {

  const [user, setUser] = useState<User>({ currentUser: null });

  const fetchData = async () => {
    const user = await getUser();
    setUser(user);
    console.log(user);
  } 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Landing Page</h1>
    </main>
  )
}
