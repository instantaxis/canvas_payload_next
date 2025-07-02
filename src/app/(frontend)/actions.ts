'use server';

import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { registerSchema } from '@/schemas/registerSchema';

/**
 * @description Registers a new user via a server action.
 * @param {FormData} formData - The form data containing user registration details.
 * @returns {Promise<{ success: boolean; user?: any; error?: string }>}
 */
export async function registerUserAction(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsedData = registerSchema.parse(data);

  const payload = await getPayload({
    config: configPromise,
  });

  try {
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email: parsedData.email,
        password: parsedData.password,
        first_name: parsedData.first_name,
        last_name: parsedData.last_name,
      },
    });
    return { success: true, user: newUser };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
