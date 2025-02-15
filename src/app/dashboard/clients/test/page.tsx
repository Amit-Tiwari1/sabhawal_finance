"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/utils/getToken";

export default function Dashboard() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {token ? <p>Token: {token}</p> : <p>No token found</p>}
    </div>
  );
}
