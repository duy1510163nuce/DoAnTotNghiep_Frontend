import * as Yup from 'yup';


export const ValidationRegister = Yup.object().shape({
    name: Yup.string(),
    password: Yup.string(),
    confirmPassword: Yup.string().required('password not require'),
    email: Yup.string()
        .required('email not require')
        .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'email not  validate'),
});

export const ValidationLogin = Yup.object().shape({
    password: Yup.string().required('password not require'),
    username: Yup.string().required('valid require')
});


export const ValidationCreatePost = Yup.object().shape({
    category: Yup.number(),
    // .required("please choose your school"),
    title: Yup.string().required('title not require'),
    content: Yup.string().required('content not require'),
    hashtag: Yup.string(),
    // .required("hashtag not require"),
});
export const ValidationUpdateInfo = Yup.object().shape({
    email:Yup.string(),
    gender: Yup.string(),
    phone: Yup.string()
        .matches(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            "valid required"
        ),
});