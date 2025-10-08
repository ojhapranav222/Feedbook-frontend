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

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});

const LoginPage = () => {
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
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/auth/login', data);
      const { access_token } = response.data;
      dispatch(setToken(access_token));
      toast.success('Logged in successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
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
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-6 bg-[var(--bg-secondary)] rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <Image src="/logo.svg" alt="FeedBook Logo" width={150} height={50} className="mx-auto" />
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-4">Welcome Back!</h1>
          <p className="text-[var(--text-secondary)]">Sign in to continue to FeedBook</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="text-center text-[var(--text-secondary)]">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-[var(--accent)] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;