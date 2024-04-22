import * as Yup from 'yup'

// min 8 , max 28, one digit, one Upper, one Lower, one speical char 
const passwordRules = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,28}$/;
 

// Validate Login from schema
export const LoginSchema = Yup.object().shape({
    username: Yup.string()
    .min(8,'Must be at least 8 characters!')
    .max(22,'Max characters 22!')
    .required("Required"),
    password: Yup.string()
    .min(8,'Must be at least 8 characters!')
    .max(28,'Must be max length of 28 characters!')
    .matches(passwordRules,"Must inclued:(Uppercase, Lowercase, Number, Symbol)").required("Required")
});
