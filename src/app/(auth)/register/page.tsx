"use client";

import { signUp } from "@/lib/auth-client";
import { Eye, EyeClosed, EyeClosedIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Logo from '@/assest/logo.png'

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show / Hide states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Email validation
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasMinLength = password.length >= 6;

  // Confirm password
  const passwordMatch = password.length > 0 && password === confirmPassword;

  // All validation
  const isFormValid =
    validEmail && hasUppercase && hasNumber && hasMinLength && passwordMatch;

    const router = useRouter()
  // Submit function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid || loading) return;

    setLoading(true);

    try {
      // Temporary loading simulation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const userData = {
        name,
        email,
        password,
      };

      const { data } = await signUp.email(userData);
      if (data) {
        toast.success("Registration successful!");
        setName('')
        setEmail('')
        setPassword("")
        setConfirmPassword('') 
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-bg">
      <div className="w-lg bg-white mx-auto mt-20 p-6 border rounded-xl">
        <Image src={Logo} alt="logo" width={40} height={40}></Image>
        <h1 className="text-2xl font-bold ">Create Account</h1>
        <p className="mt-1 mb-5 text-sm text-stone-500">
          Enter your information to become part of our community.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-5">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your email"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg mt-2"
            />
          </div>
          {/* Email */}
          <div className="mb-5">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg mt-2"
              autoCapitalize="email"
            />

            {email.length > 0 && (
              <p className={validEmail ? "text-green-600" : "text-red-500"}>
                {validEmail ? "✓ Valid email" : "✗ Invalid email"}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label>Password</label>

            <div className="flex border rounded-lg mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 outline-none"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-sm"
              >
                {showPassword ? <Eye /> : <EyeClosedIcon />}
              </button>
            </div>

            <div className="mt-3 space-y-1">
              <p
                className={
                  hasUppercase
                    ? "text-green-600 text-[10px]"
                    : "text-red-500 text-[10px]"
                }
              >
                {hasUppercase ? "✓" : "✗"} At least 1 uppercase letter
              </p>

              <p
                className={
                  hasNumber
                    ? "text-green-600 text-[10px]"
                    : "text-red-500 text-[10px]"
                }
              >
                {hasNumber ? "✓" : "✗"} At least 1 number
              </p>

              <p
                className={
                  hasMinLength
                    ? "text-green-600 text-[10px]"
                    : "text-red-500 text-[10px]"
                }
              >
                {hasMinLength ? "✓" : "✗"} Minimum 6 characters
              </p>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label>Confirm Password</label>

            <div className="flex border rounded-lg mt-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 outline-none"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="px-3 text-sm"
              >
                {showConfirmPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>

            {confirmPassword.length > 0 && (
              <p className={passwordMatch ? "text-green-600" : "text-red-500"}>
                {passwordMatch
                  ? "✓ Password matched"
                  : "✗ Password does not match"}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#F28C45] to-[#e26c28] text-white p-3 rounded-lg cursor-pointer font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-stone-200" />
          <span className="text-sm text-stone-500">or continue with</span>
          <span className="h-px flex-1 bg-stone-200" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 cursor-pointer"
        >
          <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-stone-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-dark hover:text-primery hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
