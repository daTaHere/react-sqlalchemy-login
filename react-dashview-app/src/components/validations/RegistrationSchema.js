import * as Yup from 'yup'

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,42}$/;

// validate Registration form schema
export const RegistrationSchema = Yup.object().shape({
    first_name: Yup.string()
    .min(2,'Must be at least 82characters!')
    .max(28,'Must be max length of 28 characters!')
    .matches(/[a-zA-Z]/, 'Invalid Character!')
    .required('Field is Required!'),
    middle_initial: Yup.string()
    .max(1,'Must be max length of 1 characters!')
    .matches(/[a-zA-Z]/, 'Invalid Character!'),
    last_name: Yup.string()
    .min(2,'Must be at least 2 characters!')
    .max(28,'Must be max length of 28 characters!')
    .matches(/[a-zA-Z]/, 'Invalid Character!')
    .required('Field is Required!'),
    username: Yup.string()
    .min(8,'Must be at least 8 characters!')
    .max(28,'Must be max length of 28 characters!')
    .required('Field is Required!'),
    email: Yup.string()
    .email('Invalid Email!')
    .required('Field is Required!'),
    password: Yup.string()
    .min(8,'Must be at least 8 characters!')
    .max(28,'Must be max length of 28 characters!')
    .matches(passwordRules, { message: "Must inclued:(Uppercase, Lowercase, Number, Symbol )" })
    .required('Field is Required!'),
});