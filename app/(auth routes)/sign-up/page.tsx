'use client';
import { getCurrentUser, login, register } from '@/lib/api/clientApi';
// 1. register
// 2. оновлення стану аутентифікації
// 3. редірект

import { useAuthStore } from '@/lib/store/authStore';
import { RegisterCredentials, User } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
// import { register } from '@/lib/api/clientApi';
// import { useAuthStore } from '@/lib/store/authStore';
// import { Credentials } from '@/types/user';
// import { ApiError } from 'next/dist/server/api-utils';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
const initialValues: RegisterCredentials = {
  name: '',
  email: '',
  password: '',
};

const SignUpPage = () => {
  const router = useRouter();
  // const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  // const handleSubmit = async (formData: FormData) => {
  //   try {
  //     const values = Object.fromEntries(formData) as unknown as Credentials;
  //     const user = await register(values);
  //     if (user) {
  //       setUser(user);
  //       // router.push('/profile');
  //     }
  //   } catch (error) {
  //     setError((error as ApiError).message ?? 'something went wrong');
  //   }
  // };

  const signUpMutation = useMutation({
    mutationFn: async (values: RegisterCredentials) => {
      await register(values);
      await login({ email: values.email, password: values.password });
      return getCurrentUser();
    },
    onSuccess: (user: User) => {
      setUser(user);

      queryClient.setQueryData(['currentUser'], user);

      router.push('/onboarding');
    },
    onError: (err) => {
      console.error('Registration error:', err);
    },
  });
  return (
    <>
      <h1>Sign up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => signUpMutation.mutate(values)}
      >
        {({ errors, touched }) => (
          <Form style={{ display: 'grid', gap: 12, maxWidth: 300 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              {touched.name && errors.name && (
                <span style={{ color: 'red' }}>{errors.name}</span>
              )}
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              {touched.email && errors.email && (
                <span style={{ color: 'red' }}>{errors.email}</span>
              )}
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              {touched.password && errors.password && (
                <span style={{ color: 'red' }}>{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={signUpMutation.isPending}
              style={{ opacity: signUpMutation.isPending ? 0.5 : 1 }}
            >
              {signUpMutation.isPending ? 'Loading...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignUpPage;
