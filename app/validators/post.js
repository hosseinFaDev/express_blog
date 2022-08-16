exports.create =(request) => {

    const errors = []

    if (request.title === "") {
        errors.push('عنوان نمیتواند خالی باشد');
    }

    if (request.slug === "") {
        errors.push('نامک نمیتواند خالی باشد');
    }

    if (request.content === "") {
        errors.push('محتوا نمیتواند خالی باشد');
    }
    if (request.status === "" ||request.status === undefined ) {
        errors.push('وضعیت نمیتواند خالی باشد');
    }
    return errors ;
}