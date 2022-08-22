const postModel = require('../../models/post/index');
const jalali = require('../../services/dateServices');
const excerptServices = require('../../services/excerpt');
const settingModel = require('../../models/setting');

exports.index = async (req, res) => {

    const pageDescription = await settingModel.get('website_description');
    const pageTitle = await settingModel.get('website_title');
    const postPerPage = parseInt(await settingModel.get('post_per_page'));
    const page = 'page' in req.query ? parseInt(req.query.page) : 1;

    if (!(page.valueOf())) {
        return res.send('opppss page qs is empty')
    }

    let posts = await postModel.findPostInPagination(page, postPerPage);
    posts.map(post => {
        post.jalaliDate = jalali.toPersianDate(post);
        post.excerpt = excerptServices.excerpt(post.content);
        return post
    })

    const totalPosts = await postModel.count();
    const totalPage = Math.ceil(totalPosts / postPerPage);
    const pagination = {
        page,
        totalPage,
        nextPage: page < totalPage ? page + 1 : totalPage,
        pervPage: page > 1 ? page - 1 : 1,
        hasNext: page < totalPage,
        hasPrev: page > 1

    }
    let lastestPosts = await postModel.lastestPosts(limit =3);
    lastestPosts.map((post => {
        post.jalaliDate =  jalali.toPersianDate(post.created_at);
        return post ;
    }))
 
    res.frontRender('front/home/front', {
        posts, pagination,lastestPosts, pageTitle, pageDescription, helpers: {
            showDisable: function (disable) {
                return !disable ? 'disabled' : '';
            }
        }
    });
}

exports.search = async (req, res) => {
    const keyword = req.query.keyword;
    const posts = await postModel.keyword(keyword);
    res.frontRender('front/home/search',{posts})

}