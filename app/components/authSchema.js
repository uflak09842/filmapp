import * as Yup from 'yup';

export default RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Kullanıcı adı çok kısa!')
      .max(20, 'Kullanıcı adı çok uzun!')
      .required('Kullanıcı adı gerekli'),
    email: Yup.string()
      .email('Geçerli bir e-posta giriniz')
      .required('E-mail gerekli'),
    password: Yup.string()
      .min(6, 'Şifre en az 6 karakter olmalı')
      .required('Şifre gerekli'),
    country: Yup.string()
    .required('Ülke Gerekli'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçerli bir e-posta giriniz')
    .required('E-mail gerekli'),
  password: Yup.string()
    .required('Şifre gerekli'),
})