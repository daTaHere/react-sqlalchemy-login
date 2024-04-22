import * as Yup from 'yup'

// min 8 , max 28, one digit, one Upper, one Lower, one speical char 
const passwordRules = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,28}$/;

// validate Reset form schema
export const PWResetSchema =  Yup.object().shape({
    new_password: Yup.string()
                    .matches(passwordRules,"Must inclued:(Uppercase, Lowercase, Number, Symbol)")
                    // .test('isRepeatPW','Password Cannot Match Previous!',value => value === oldPw)
                    .required('Required'),
    confirm_password: Yup.string().oneOf([Yup.ref('new_password'),null], "Your Emails Do Not Match").required('Required')
});