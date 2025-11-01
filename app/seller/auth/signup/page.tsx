"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSellerAuth } from "@/context/SellerAuthContext";
import Link from "next/link";
import { Mail, Lock, User, Store, MapPin, Eye, EyeOff, Tag } from "lucide-react";

function SellerSignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    workshop: "",
    location: "",
    specialties: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useSellerAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/seller/dashboard";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const specialtiesArray = formData.specialties.split(",").map((s) => s.trim());
      const success = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        workshop: formData.workshop,
        location: formData.location,
        specialties: specialtiesArray,
      });

      if (success) {
        router.push(redirect);
      } else {
        setError("Failed to create account");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#F29727] rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">AbaTrade</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Register as a Seller
          </h1>
          <p className="text-gray-600">
            Join our marketplace and reach Houston buyers
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                  />
                </div>
              </div>

              {/* Workshop Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Workshop Name *
                </label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="workshop"
                    value={formData.workshop}
                    onChange={handleChange}
                    placeholder="e.g., Royal Leather Crafts"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Ariaria Market, Aba"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                  />
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Specialties *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="specialties"
                  value={formData.specialties}
                  onChange={handleChange}
                  placeholder="e.g., Leather Bags, Wallets, Shoes (comma separated)"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F29727]"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Separate multiple specialties with commas</p>
            </div>

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-[#F29727] rounded focus:ring-[#F29727]"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#F29727] hover:underline font-semibold">
                    Seller Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#F29727] hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                  . I understand my workshop will be verified before approval.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F29727] hover:bg-[#d97f0f] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Register as Seller"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href={`/seller/auth/login${redirect !== "/seller/dashboard" ? `?redirect=${redirect}` : ""}`}
            className="block w-full text-center bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-6 rounded-lg border-2 border-gray-300 transition-colors"
          >
            Login to Dashboard
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-[#F29727]">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SellerSignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-[#F29727] rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SellerSignupForm />
    </Suspense>
  );
}
