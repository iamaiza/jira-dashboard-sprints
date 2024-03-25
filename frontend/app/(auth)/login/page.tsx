"use client"

import cookie from "@/utils/cookie";
import { LOGIN_USER } from "@/utils/query-mutations";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginUserMutation, { error: graphqlError }] = useMutation(LOGIN_USER);
  const router = useRouter();

  const loginUserHandler = async(e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email.trim() || !password.trim()) {
        setErrorMessage("Fields cannot be empty");
        return;
      }
      if (!email.includes("@") || !email.includes(".com")) {
        setErrorMessage("Email is not valid");
        return;
      }
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long");
        return;
      }
      const { data } = await loginUserMutation({
        variables: {
          data: { email, password }
        }
      })
      cookie.set('token', data.loginUser.token);
      setEmail("");
      setPassword("");
      
      router.push('/')

    } catch (error: any) {

      if(graphqlError?.graphQLErrors && graphqlError.graphQLErrors.length > 0) {
        const err = graphqlError.graphQLErrors[0].message;
        setErrorMessage(err)
      }

      setErrorMessage(error.message)
    }
  }
  
  return (
    <div className="max-w-md mx-auto flexCenter flex-col h-dvh">
      <form className="w-full mt-7" onSubmit={loginUserHandler}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="text-red-400">{errorMessage}</p>}
        <button type="submit" className="w-full py-2 px-3 mt-2 bg-pink-600 text-white">
          Login
        </button>
        <div></div>
        <div className="text-center mt-2 flexBetween gap-2">
          <Link
            href="/forgot-password"
            className="text-sm underline text-gray-600"
          >
            Forgot password
          </Link>
          <Link href="/register" className="underline text-gray-600 text-sm">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
