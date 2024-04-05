"use client";

import cookie from "@/utils/cookie";
import { REGISTER_USER } from "@/utils/query-mutations";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, MouseEvent, useState } from "react";

const Registration = () => {
  const [state, setState] = useState(() => ({
    name: "",
    email: "",
    password: "",
    imgUrl: "",
    jobTitle: "",
    department: "",
    organization: "",
    location: "",
  }));
  const router = useRouter();
  const [registerUserMutation, { error: graphqlError }] =
    useMutation(REGISTER_USER);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registerUserHandler = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {
        name,
        email,
        password,
        imgUrl,
        jobTitle,
        department,
        organization,
        location,
      } = state;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;

      if (!name.trim() || !email.trim() || !password.trim()) {
        setErrorMessage("Fields cannot be empty");
        return;
      }
      if (!email.includes("@") || !email.includes(".com")) {
        setErrorMessage("Email is invalid");
        return;
      }
      if (!passwordRegex.test(password)) {
        setErrorMessage(
          "Password should be at least 6 characters long and must contain letters, symbols and digits"
        );
        return;
      }

      const { data } = await registerUserMutation({
        variables: {
          data: {
            name,
            email,
            password,
            imgUrl,
            jobTitle,
            department,
            organization,
            location,
          },
        },
      });
      cookie.set("token", data.registerUser.token);
      setState(() => ({
        name: "",
        email: "",
        password: "",
        imgUrl: "",
        jobTitle: "",
        department: "",
        organization: "",
        location: "",
      }));
      router.push("/");
    } catch (error: any) {
      if (
        graphqlError?.graphQLErrors &&
        graphqlError.graphQLErrors.length > 0
      ) {
        const err = graphqlError.graphQLErrors[0].message;
        setErrorMessage(err);
      }
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto flexCenter flex-col h-dvh">
      <form className="w-full mt-7" onSubmit={registerUserHandler}>
        <input
          className="text-slate-400"
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleChange}
        />
        <input
          className="text-slate-400"
          type="email"
          name="email"
          placeholder="Email Address"
          value={state.email}
          onChange={handleChange}
        />
        <input
          className="text-slate-400"
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <input
          className="text-slate-400"
          type="text"
          name="imgUrl"
          placeholder="Image Url (Optional)"
          value={state.imgUrl}
          onChange={handleChange}
        />
        <input
          className="text-slate-400"
          type="text"
          name="jobTitle"
          placeholder="Job Title (Optional)"
          value={state.jobTitle}
          onChange={handleChange}
        />
        <input
          className="text-slate-400"
          type="text"
          name="department"
          placeholder="Department (Optional)"
          value={state.department}
          onChange={handleChange}
        />
        <input
          className="text-slate-400"
          type="text"
          name="organization"
          placeholder="Organization (Optional)"
          value={state.organization}
          onChange={handleChange}
        />
        <input
          className="text-slate-400"
          type="text"
          name="location"
          placeholder="Location (Optional)"
          value={state.location}
          onChange={handleChange}
        />
        {errorMessage && <p className="text-red-400">{errorMessage}</p>}
        <button
          type="submit"
          className="bg-sky-950 text-white w-full py-2 px-3 mt-2"
        >
          Register
        </button>
        <div className="text-center mt-2 flexCenter gap-2 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-600 underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
