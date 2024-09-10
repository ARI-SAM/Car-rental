import {
  GoogleAuthProvider,
  browserLocalPersistence,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { ImGithub, ImGoogle, ImSpinner } from "react-icons/im";
import { auth } from "../firebase";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading("google");
    try {
      auth.setPersistence(browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential === null) throw new Error("Credential is null");
    } catch (error: any) {
      console.log("ERROR OCCURRED: ", error);
    }
    setIsLoading(null);
  };

  return (
    <div className="grid gap-6 pt-20 justify-center" {...props}>
      <div className="flex flex-col gap-2">
        <button
          className="cursor-pointer flex items-center w-fit bg-black text-white px-6 py-2 rounded-xl font-semibold"
          type="button"
          disabled={!!isLoading && isLoading !== "google"}
          onClick={handleGoogleSignIn}
        >
          {isLoading === "google" ? (
            <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ImGoogle className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </button>
        {/* <Button
          variant="outline"
          type="button"
          disabled={!!isLoading && isLoading !== "github"}>
          {isLoading === "github" ? (
            <ImSpinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ImGithub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button> */}
      </div>
    </div>
  );
}
