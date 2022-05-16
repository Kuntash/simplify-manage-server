import jwt, { Jwt, Secret, VerifyOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { promisify } from 'util';
export const createJWT = (mongoDBId: mongoose.Types.ObjectId): string => {
  return jwt.sign({ id: mongoDBId }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyJWTAsync = async (
  userJWT: string
): Promise<{ id: string; iat: number; exp: number }> => {
  return (await promisify<string, Secret>(jwt.verify)(
    userJWT,
    process.env.JWT_SECRET as Secret
  )) as unknown as { id: string; iat: number; exp: number };
};
