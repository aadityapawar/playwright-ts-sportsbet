import dotenv from 'dotenv';

export const env = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw Error(`No environment variable found for ${key}`);
  }
  return value;
};

dotenv.config({ path: env('COMMON_CONFIG_FILE') });
