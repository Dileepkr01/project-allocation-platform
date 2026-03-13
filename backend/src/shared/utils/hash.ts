import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { config } from '../../config';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, config.bcrypt.saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateTempPassword = (firstName: string, identifier: string): string => {
  const prefix = firstName.substring(0, 3).charAt(0).toUpperCase() + firstName.substring(1, 3).toLowerCase();
  const randomSuffix = crypto.randomBytes(2).toString('hex');
  const special = ['#', '@', '$', '!'][Math.floor(Math.random() * 4)];
  return `${prefix}${identifier}${special}${randomSuffix}`;
};