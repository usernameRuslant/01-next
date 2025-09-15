'use client';

import { getCurrentUser, updateUser, uploadAvatar } from '@/lib/api/api';
import { Formik, Form, Field } from 'formik';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
// import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { User } from '@/types/user';
import Image from 'next/image';

// интерфейс данных для онбординга
interface OnboardingValues {
  dueDate: string;
  babyGender: 'boy' | 'girl' | 'unknown';
  avatar: File | null;
}

const initialValues: OnboardingValues = {
  dueDate: '',
  babyGender: 'unknown',
  avatar: null,
};

// схема валидации
const OnboardingSchema = Yup.object({
  dueDate: Yup.date().required('Оберіть дату'),
  babyGender: Yup.string()
    .oneOf(['boy', 'girl', 'unknown'])
    .required('Оберіть стать'),
  avatar: Yup.mixed().nullable(),
});

export default function OnboardingClient() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  // const onSubmit = async (
  //   values: OnboardingValues,
  //   actions: FormikHelpers<OnboardingValues>
  // ) => {
  //   try {
  //     await updateUser({
  //       dueDate: values.dueDate,
  //       babyGender: values.babyGender,
  //     });

  //     if (values.avatar) {
  //       await uploadAvatar(values.avatar);
  //     }
  //     console.log(values);
  //     const updatedUser = await getCurrentUser();
  //     setUser(updatedUser);

  //     router.push('/');
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error('Error status:', error.response?.status);
  //       console.error('Error data:', error.response?.data);
  //     } else {
  //       console.error(error);
  //     }
  //   } finally {
  //     actions.setSubmitting(false);
  //   }
  // };
  const queryClient = useQueryClient();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  /** 🔹 Мутация онбординга */
  const onboardingMutation = useMutation({
    mutationFn: async (values: OnboardingValues) => {
      await updateUser({
        dueDate: values.dueDate,
        babyGender: values.babyGender,
      });

      if (values.avatar) {
        await uploadAvatar(values.avatar);
      }

      return getCurrentUser(); // возвращаем обновлённого пользователя
    },

    onSuccess: (user: User) => {
      // 1️⃣ Обновляем Zustand
      setUser(user);

      // 2️⃣ Обновляем кэш React Query (например, GreetingBlock)
      queryClient.setQueryData(['currentUser'], user);

      // 3️⃣ Редирект
      router.push('/');
    },

    onError: (err) => {
      console.error('Onboarding error:', err);
    },
  });
  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={OnboardingSchema}
        onSubmit={(values) => onboardingMutation.mutate(values)}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form style={{ display: 'grid', gap: 16 }}>
            {/* Дата родов */}
            <div>
              <label htmlFor="dueDate">Планова дата пологів</label>
              <Field type="date" id="dueDate" name="dueDate" />
              {touched.dueDate && errors.dueDate && (
                <div style={{ color: 'red', fontSize: 12 }}>
                  {errors.dueDate}
                </div>
              )}
            </div>

            {/* Пол ребёнка */}
            <div>
              <label htmlFor="babyGender">Стать дитини</label>
              <Field as="select" id="babyGender" name="babyGender">
                <option value="boy">Хлопчик</option>
                <option value="girl">Дівчинка</option>
                <option value="unknown">Ще не знаю</option>
              </Field>
            </div>

            {/* Аватар */}
            <div>
              <label htmlFor="avatar">Аватар</label>
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    setFieldValue('avatar', file);
                    setAvatarPreview(URL.createObjectURL(file));
                  }
                }}
              />
              {avatarPreview && (
                <Image
                  src={avatarPreview}
                  alt="preview"
                  style={{ width: 80, height: 80, marginTop: 8 }}
                />
              )}
            </div>

            <button type="submit" disabled={onboardingMutation.isPending}>
              {onboardingMutation.isPending ? 'Збереження…' : 'Зберегти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
