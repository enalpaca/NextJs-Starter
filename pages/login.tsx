
import React, { useState } from "react";
export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mainDivStyle = {
    padding: "1em",
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    // throw new Error("Function not implemented.");
    console.log(
        'Handle Submit'
    )
    console.log(
        'username',username
    )
    console.log(
        'password',password
    )
}
  return (
    <div style={mainDivStyle}>
      <form onSubmit={(e) => handleSubmit(e)} action="/api/sendatalogin" method="get">
      <h1 className="h3 mb-3 fw-normal">Đăng nhập</h1>
        <label htmlFor="username"> Username </label>
        <hr />
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <hr />
        <label htmlFor="password"> Password</label>
        <hr />
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <hr />
        <button type="submit"> Log in </button>
      </form>
    </div>
  );
}

function handleGetUser(): void {
    throw new Error("Function not implemented.");
}

function handleLogOut(): void {
    throw new Error("Function not implemented.");
}

