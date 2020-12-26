import * as yup from 'yup';

export class Validators {
    static loginValidator() {
        return yup.object().shape({
            emailTextInput: yup.string().email('Not a Valid Email').required('Email is required'),
            passwordTextInput: yup.string().required('Password is required')
        })
    }
}