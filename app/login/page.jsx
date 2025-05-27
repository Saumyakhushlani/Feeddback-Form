"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Set user data once session is loaded
  useEffect(() => {
    if (session) {
      setName(session.user?.name || "");
      setEmail(session.user?.email || "");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { name, email };

    try {
      const res = await fetch("/api/userlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log("User data sent successfully");
      } else {
        console.error("Failed to send user data due to same email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-bold mb-4">Login with Google</h1>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <>
          <div className="mb-2">Welcome, {name}</div>
          <div className="mb-2">{email}</div>
          <img src={session.user?.image} alt="Profile" className="mb-4 w-20 h-20 rounded-full" />

          <form onSubmit={handleSubmit} className="mb-4">
            <input type="hidden" value={name} />
            <input type="hidden" value={email} />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded mr-4"
            >
              Submit Data
            </button>
          </form>

          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-blue-500 rounded text-black"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
}
