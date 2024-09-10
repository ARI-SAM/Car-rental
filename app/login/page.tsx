"use client";
import "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/user-user";
import { LoginForm } from "@/components/LoginForm";

export default function Page() {
  const { loggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("bruh1");
    if (loggedIn) {
      router.push("/");
    }
  }, [loggedIn]);

  return (
    <div className="w-full justify-center">
      <LoginForm />
    </div>
  );
}
