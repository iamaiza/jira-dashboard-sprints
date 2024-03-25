"use client"

import { FORGOT_PASSWORD } from "@/utils/query-mutations";
import { useMutation } from "@apollo/client";
import { MouseEvent, useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPasswordMutation, { error: graphqlError }] = useMutation(FORGOT_PASSWORD)

  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email === "" || !email.includes("@") || !email.includes(".com")) {
        setErrorMessage("Please enter a valid email");
        return;
      }
      const { data } = await forgotPasswordMutation({
        variables: {
          data: {
            email
          }
        }
      })
      console.log(data);
      
      setMsg(data.forgotPassword.message)
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
      {msg ? (
        <div className="flexCenter gap-2.5">
          {msg}.
        </div>
      ) : (
        <form className="w-full mt-7" onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
          <button type="submit" className="bg-pink-600 text-white w-full py-2 px-3">
            Continue
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
