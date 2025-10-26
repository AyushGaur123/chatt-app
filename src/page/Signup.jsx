import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/useAuth.js";
import { MessageSquare, User, Mail, Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signup(data);
      reset();
    } catch (error) {
      console.log("Signup Error:", error);

      if (error.response?.data?.message) {
        setError("email", {
          type: "server",
          message: error.response.data.message,
        });
      } else {
        toast.error("Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 transition-colors duration-300">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-6 flex items-center justify-center gap-2">
            Create Account
            <MessageSquare className="size-6 text-primary" />
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("fullName", {
                    required: "Full name is required",
                    maxLength: {
                      value: 10,
                      message: "Username cannot exceed 10 characters",
                    },
                  })}
                  className="input input-bordered w-full pl-10"
                />
              </div>
              {errors.fullName && (
                <p className="text-error text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2 w-5 h-5 z-10" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                  className="input input-bordered w-full pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary w-full text-white ${loading ? "loading" : ""
                  }`}
              >
                {loading ? "Processing..." : "Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

