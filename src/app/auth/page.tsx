'use client';

import React, { useState } from "react";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithEmailPassword,
  signUpWithEmailPassword,
  logout
} from "@/config/authServices";
import { User } from 'firebase/auth';

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (provider: 'google' | 'facebook' | 'github' | 'email') => {
    try {
      setError(null);
      let result;

      switch (provider) {
        case 'google':
          result = await signInWithGoogle();
          break;
        case 'facebook':
          result = await signInWithFacebook();
          break;
        case 'github':
          result = await signInWithGithub();
          break;
        case 'email':
          result = await signInWithEmailPassword({ email, password });
          break;
      }

      setUser(result.user);
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error instanceof Error ? error.message : 'An error occurred during sign in');
    }
  };

  const handleRegister = async () => {
    try {
      setError(null);
      const result = await signUpWithEmailPassword({ email, password });
      setUser(result.user);
    } catch (error) {
      console.error("Registration error:", error);
      setError(error instanceof Error ? error.message : 'An error occurred during registration');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError(error instanceof Error ? error.message : 'An error occurred during logout');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Firebase Authentication</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {user ? (
        <div className="text-center">
          <p className="mb-4">Welcome, {user.displayName || user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleSignIn('google')}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sign In with Google
            </button>
            <button
              onClick={() => handleSignIn('facebook')}
              className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Sign In with Facebook
            </button>
            <button
              onClick={() => handleSignIn('github')}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              Sign In with GitHub
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Email and Password</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => handleSignIn('email')}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Sign In
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Register
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
