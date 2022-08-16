const postStatus = {
    DRAFT : 0 ,
    REWIEW : 1 ,
    PUBLISHED : 2
}

exports.statuses = () => {
    return postStatus ;
}
exports.readableStatuses = () =>{
    return {
        [postStatus.DRAFT] :'پیش نویش',
        [postStatus.REWIEW] : 'در حال بررسی',
        [postStatus.PUBLISHED] : 'منتشر شده'
    }
}