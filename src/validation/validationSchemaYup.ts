import * as Yup from 'yup';

// Const user in schemas
const email = Yup.string()
  .required('Required field')
  .email('Not a proper email');
const password = Yup.string()
  .required('Required field')
  .min(6, 'Password must be at least 6 symbols long');
const firstName = Yup.string()
  .required('Required field')
  .max(20, 'No more than 20 letters');
const lastName = Yup.string()
  .required('Required field')
  .max(20, 'No more than 20 letters');
const photoUrl = Yup.string()
  .url('Not a proper URL')
  .nullable();

// Schemas
export const registrationSchema = Yup.object().shape({
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password,
  passwordConfirmation: Yup.string()
    .required('Required field')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

export const loginSchema = Yup.object().shape({
  email: email,
  password: password
});

export const userProfileSchema = Yup.object().shape({
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: Yup.string().min(6, 'Password must be at least 6 symbols long'),
  postalCode: Yup.string().matches(
    RegExp('^[0-9]*$'),
    'Postal Code should contain only digits'
  ),
  house: Yup.number().positive('Enter a positive number'),
  apartment: Yup.number().positive('Enter a positive number'),
  photoUrl: photoUrl,
  phone: Yup.string()
    .matches(RegExp('^[0-9]*$'), 'Phone should contain only digits')
    .length(10, 'Phone Number should contain 10 digits')
    .nullable()
});

export const teamCreateSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  photoUrl: photoUrl,
  description: Yup.string()
});
