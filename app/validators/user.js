exports.create = (request) => {
    const errors = [];
    if (request.fullName === "") {
        errors.push('نام کامل نمیتواند خالی باشد');
    }

    if (request.email === "") {
        errors.push('ایمیل نمیتواند خالی باشد');
    }

    if (request.password === "") {
        errors.push('کلمه عبور نمیتواند خالی باشد');
    }
    if (request.role === "" ||request.role === undefined ) {
        errors.push('نقش نمیتواند خالی باشد');
    }
    return errors ;
}