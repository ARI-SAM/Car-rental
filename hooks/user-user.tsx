import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingLoginStatus, setCheckingLoginStatus] = useState(true);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      }
      setCheckingLoginStatus(false);
    });
    return () => {
      listener();
    };
  }, []);

  return {
    user,
    loggedIn,
    checkingLoginStatus,
  };
};

export default useUser;
