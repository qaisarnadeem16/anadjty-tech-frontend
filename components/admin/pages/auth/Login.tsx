"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    Link,
} from "@heroui/react";
import {
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
} from "react-icons/hi";
import { toast } from "react-hot-toast";
import { login } from "@/lib/api/auth";
import Image from "next/image";
import Button from "../../shared/custom-btn";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setIsLoading(true);

            const response = await login({ email, password });

            if (response?.user) {
                // Token is already stored in localStorage by the login function
                localStorage.setItem("user", JSON.stringify(response.user));
                toast.success("Login successful!");
                router.push("/admin/home");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } catch (error: any) {
            toast.error(error?.message || "Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="max-h-screen h-screen overflow-y-hidden grid grid-cols-1 md:grid-cols-2 ">

            <div className="flex  items-center justify-center p-10  bg-gray-100">

                <Card className="w-full max-w-md rounded-2xl shadow-2xl bg-white ">
                    <CardHeader className="flex flex-col items-center text-start gap-1 mt-4">
                        <h1 className="sm:text-3xl text-2xl font-bold text-gray-800 mt-3">
                            Welcome Back 👋
                        </h1>
                        <p className="text text-gray-500 mb-2">
                            Sign in to access your dashboard
                        </p>
                    </CardHeader>


                    <CardBody className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <HiOutlineMail className="absolute left-3 top-3 text-gray-400 text-lg" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400 text-lg" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <HiOutlineEyeOff className="text-lg" />
                                        ) : (
                                            <HiOutlineEye className="text-lg" />
                                        )}
                                    </button>
                                </div>
                            </div>


                            {/* Submit button */}
                            <Button
                                label="Sign In"
                                loading={isLoading}
                                loadingLabel="Signing In..."
                                disabled={isLoading}
                                type="submit"
                                style="bg-blue-900 text-white w-full rounded-lg"
                            />

                        </form>
                    </CardBody>
                </Card>
            </div>

            <div className=" hidden md:flex  items-center justify-center bg-gray-100">

                <Image
                    src={"/login.jpg"}
                    height={1000}
                    priority
                    unoptimized
                    width={1000}
                    className="w-full h-full object-cover object-top"
                    alt="login image"
                />
            </div>
        </div>
    );
};

export default Login;
