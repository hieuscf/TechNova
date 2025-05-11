import validator from 'validator';
import { PASSWORD_REGEX } from "../constant/regex";

//Chuẩn hóa username trước khi kiểm tra:
export const isValidUsername = (username: string): boolean  =>{
  const usernameRegex = /^(?!\d+$)[a-zA-Z][a-zA-Z0-9]{0,29}$/;
  return usernameRegex.test(username);
}


export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};
  

export const isValidPassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};