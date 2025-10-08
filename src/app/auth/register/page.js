'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

import Input from '@/components/Input';
import Button from '@/components/Button';
import useAxios from '@/hooks/useAxios';
import { setToken } from '@/redux/slices/authSlice';

const registerSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const axios = useAxios();
  const { isAuthenticated, authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, authLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/auth/register', data);
      const { access_token } = response.data;
      dispatch(setToken(access_token));
      toast.success('Registered successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  if (authLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg-primary)]">
        <p className="text-[var(--text-primary)]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-primary)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[var(--bg-secondary)] rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <Image src="/logo.svg" alt="FeedBook Logo" width={150} height={50} className="mx-auto" />
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-4">Create an Account</h1>
          <p className="text-[var(--text-secondary)]">Join FeedBook today!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex space-x-4">
            <Input
              name="first_name"
              placeholder="First Name"
              register={register}
              error={errors.first_name}
            />
            <Input
              name="last_name"
              placeholder="Last Name"
              register={register}
              error={errors.last_name}
            />
          </div>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            error={errors.email}
          />
          <Input
            name="username"
            type="text"
            placeholder="Username"
            register={register}
            error={errors.username}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
        <div className="text-center text-text-secondary">
          <p>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-accent hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
