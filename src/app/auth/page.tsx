'use client';

import React, { useState } from "react";
import { signInWithGoogle, signOutUser } from "@/config/authServices";
import { User } from 'firebase/auth';

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = async () => {
    try {
      const userData = await signInWithGoogle();
      setUser(userData);
    } catch (error) {
      console.error("Error Signing In:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
    } catch (error) {
      console.error("Error Signing Out:", error);
    }
  };

  return (
    <div>
      <h1>Firebase Google Authentication</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
}
