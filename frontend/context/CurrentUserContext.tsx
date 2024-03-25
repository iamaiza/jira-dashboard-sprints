"use client";

import { User } from "@/types/types";
import cookie from "@/utils/cookie";
import { CURRENT_USER } from "@/utils/query-mutations";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextProps {
  user: User | null;
  logoutHandler: () => void;
}

export const CurrentUserContext = createContext<ContextProps | null>(null);

export const CurrentUserContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const token = cookie.get("token");
  const router = useRouter();
  const { data } = useQuery(CURRENT_USER, {
    variables: {
      userId: token,
    },
  });

  useEffect(() => {
    if (data?.currentUser) getCurrentUser();
  }, [data?.currentUser]);

  const getCurrentUser = async () => {
    if (data?.currentUser) {
      await setCurrentUser(data.currentUser);
    } else {
      setCurrentUser(null);
    }
  };
  const logoutHandler = async () => {
    setCurrentUser(null);
    cookie.remove("token");
    await router.push("/login");
  };

  const ctxValue = {
    user: currentUser,
    logoutHandler: logoutHandler,
  };

  return (
    <CurrentUserContext.Provider value={ctxValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};

const useCurrentUser = () => {
  const ctx = useContext(CurrentUserContext);
  return { user: ctx?.user, logoutHandler: ctx?.logoutHandler };
};

export default useCurrentUser;
