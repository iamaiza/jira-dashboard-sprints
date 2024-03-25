"use client";

import cookie from "@/utils/cookie";
import { RESET_PASSWORD } from "@/utils/query-mutations";
import { useMutation } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useState } from "react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [resetPasswordMutation, { error: graphqlError }] = useMutation(RESET_PASSWORD)
  const token = cookie.get("token");
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  

  const resetPasswordHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;
      if (!newPassword.trim() || !confirmPassword.trim()) {
        setError("Fields cannot be empty");
        return;
      }
      if (!passwordRegex.test(newPassword) || !passwordRegex.test(confirmPassword)) {
        setError("Password must be at least 6 characters and must contain letters, symbols and digits only.");
        return;
      }
      if (newPassword.length !== confirmPassword.length) {
        setError("Passwords do not match");
        return;
      }

      const { data } = await resetPasswordMutation({
        variables: {
          email,
          data: {
            newPassword, confirmPassword
          }
        }
      })

      if(data.resetPassword.message !== "Success") {
        setError(data.resetPassword.message);
      }
      setNewPassword('')
      setConfirmPassword('')
      
      if(token) router.push("/")
      else router.push("/login")

    } catch (error: any) {
      if(graphqlError?.graphQLErrors && graphqlError.graphQLErrors.length > 0) {
        const err = graphqlError.graphQLErrors[0].message;
        setError(err)
      }
      setError(error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto flexCenter flex-col h-dvh">
      <form className="w-full mt-7" onSubmit={resetPasswordHandler}>
        {token && <input type="password" placeholder="Password" readOnly />}

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="bg-pink-600 text-white w-full py-2 px-3"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
