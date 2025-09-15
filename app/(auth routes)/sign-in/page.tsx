// 'use client';

// import { getCurrentUser, login } from '@/lib/api/api';
// import { useAuthStore } from '@/lib/store/authStore';
// import { LoginCredentials } from '@/types/user';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// const SignIn = () => {
//   const router = useRouter();
//   const setUser = useAuthStore((state) => state.setUser);

//   const onSubmit = async (formData: FormData) => {
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;
//     const credentials: LoginCredentials = {
//       email,
//       password,
//     };
//     try {
//       await login(credentials);
//       const profile = await getCurrentUser();
//       setUser(profile);
//       router.push('/');
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <h1>Login Page</h1>
//       <form
//         action={onSubmit}
//         style={{ display: 'grid', gap: 12, maxWidth: 300 }}
//       >
//         <div style={{ display: 'grid', gap: 8 }}>
//           <label htmlFor="email">Email</label>
//           <input type="email" name="email" id="email" />
//         </div>

//         <div style={{ display: 'grid', gap: 8 }}>
//           <label htmlFor="password">Password</label>
//           <input type="password" name="password" id="password" />
//         </div>

//         <div>
//           <button type="submit">Log in</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignIn;
'use client';

import { getCurrentUser, login } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import { LoginCredentials, User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// ✅ схема валидации
const SignInSchema = Yup.object({
  email: Yup.string()
    .email('Невірний формат email')
    .required('Обовʼязкове поле'),
  password: Yup.string()
    .min(6, 'Пароль має містити мінімум 6 символів')
    .required('Обовʼязкове поле'),
});

export default function SignIn() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  // 🔹 useMutation для логина
  const loginMutation = useMutation({
    mutationFn: async (values: LoginCredentials) => {
      await login(values); // логин
      return await getCurrentUser(); // запрос профиля
    },
    onSuccess: (profile: User) => {
      setUser(profile); // обновляем Zustand
      queryClient.setQueryData(['currentUser'], profile); // обновляем кэш React Query
      router.push('/'); // редирект на главную
    },
    onError: (err) => {
      console.error('Login error:', err);
    },
  });

  return (
    <div style={{ maxWidth: 320, margin: '0 auto' }}>
      <h1>Вхід</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={(values) => loginMutation.mutate(values)}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-text"
              />
            </div>

            <div style={{ display: 'grid', gap: 6 }}>
              <label htmlFor="password">Пароль</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-text"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loginMutation.isPending}
              style={{ padding: '8px 12px', marginTop: '8px' }}
            >
              {loginMutation.isPending ? 'Вхід...' : 'Увійти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
