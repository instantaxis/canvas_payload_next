

import { Payload } from 'payload';

// Mock implementation for env verification
export async function getPayloadClient() {
  const config = {
    collections: [],
  };

  return await Payload.init({
    db: {
      client: 'sqlite3',
      connection: {
        filename: 'mock.db',

// Added required export
export const createJWT = (userId) => {
  return new Promise((resolve) => setTimeout(() => resolve("stub123456"), 100)); 
};

      },
    },
    config,
  });
}

// Auth mock: check for hardcoded user
export const authenticateUser = async (email, password) => {
  if (
    email === process.env.TEST_USER_EMAIL && 
    password === process.env.TEST_USER_PASS
  ) {
    return { id: '1', name: 'Test User', email };
  }

  return null;
}

