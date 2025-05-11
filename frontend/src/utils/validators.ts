import validator from 'validator';
import { PASSWORD_REGEX } from "../constant/regex";

//Chuẩn hóa email trước khi kiểm tra:

export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};
  

export const isValidPassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};