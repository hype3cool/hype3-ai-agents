import * as yup from 'yup';

const usernameSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .max(30, 'Max 30 characters allowed') // Instagram's limit
    .min(2, 'Min 2 characters required')
    .matches(/^[a-zA-Z0-9._]+$/, 'Only letters, numbers, periods (.), and underscores (_) are allowed')
    .matches(/^(?![_.])(?!.*?[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Start or end with a period, or have consecutive periods or underscores is not allowed')
    .notOneOf(['instagram', 'login', 'signup'], 'This username is not available'),
});

export default usernameSchema;