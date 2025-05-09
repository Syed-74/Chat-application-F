import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast, { Toaster } from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullName) return toast.error("Please enter your full name.");
    if (!formData.email) return toast.error("Please enter your email.");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Please enter a valid email address.");
    if (!formData.password) return toast.error("Please enter your password.");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long.");
    return true;

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);

  }
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* // Left side // */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* /*Logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get started with your free Account.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Full Name */}
            <div className='form-control'>
              <label className='lable'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input type="text" className={`input input-bordered w-full pl-10`} placeholder='User Name' value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              </div>
            </div>
            {/* E-Mail */}
            <div className='form-control'>
              <label className='lable'>
                <span className='label-text font-medium'>E-Mail</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input type="text" className={`input input-bordered w-full pl-10`} placeholder='useremail@gmail.com' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>

            {/* passsword */}
            <div className='form-control'>
              <label className='lable'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder='password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='size-5 text-base-content/40' />
                  ) : (
                    <Eye className='size-5 text-base-content/40' />
                  )}</button>
              </div>
            </div>
            {/* Submit Button */}
            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className='animate-spin size-5' />
                  Loading......
                </>

              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account? {""}
              <Link to="/login" className='link link-primary'> Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      {/* // Right Side // */}
      <AuthImagePattern
        title="Join Our Community"
        subtitle="Connect with friends, share your thoughts, and explore the world of knowledge."
      />
    </div>
  )
}

export default SignUpPage