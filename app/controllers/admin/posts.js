const postModel = require('../../models/post');
const dateServics = require('../../services/dateServices');
const langservices = require('../../services/languageServices');
const usersModel = require('../../models/user');
const postValidator = require('../../validators/post');
const { statuses } = require('../../models/post/postStatus')

exports.index = async (req, res) => {
    const posts = await postModel.findAll();
    const presentedPost = posts.map((post) => {
        post.jalaliCreatedAt = dateServics.toPersianDate(post.created_at);
        post.persianViews = langservices.toPersianNumbers(post.views);
        return post;
    });

    res.newRender('admin/posts/index', { layout: 'admin', posts: presentedPost })
}

exports.create = async (req, res) => {
    const users = await usersModel.findAll(['id', 'full_name']);
    res.newRender('admin/posts/create', { layout: 'admin', users });
}

exports.store = async (req, res) => {
    let hasError = false;
    const data = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        status: req.body.status,
        author_id: req.body.auther
    };
    const errors = postValidator.create(data);
    errors.length > 0 ? hasError = true : hasError = false;


    if (hasError) {
        const users = await usersModel.findAll(['id', 'full_name']);
        return res.newRender('admin/posts/create', { layout: 'admin', users, errors, hasError });

    }
    const result = await postModel.create(data);
    if (result) {
        res.redirect('/admin/posts');

    }
}

exports.remove = async (req, res) => {
    const postID = req.params.postID;
    if (parseInt(postID) === 0) {
        return res.redirect('/admin/posts');
    }
    const result = await postModel.delete(postID);
    return res.redirect('/admin/posts');
}

exports.edit = async (req, res) => {
    const postID = req.params.postID;
    if (parseInt(postID) === 0) {
        return res.redirect('/admin/posts');
    }
    const post = await postModel.find(postID);
    const users = await usersModel.findAll(['id', 'full_name']);
    res.newRender('admin/posts/edit', {
        layout: 'admin', users, post, postStatus: statuses(), helpers: {
            isPostAuthor: function (userID, options) {
                return post.author_id === userID ? options.fn(this) : options.inverse(this);
            },
            isSelectedStatus: function (status, options) {
                return post.status === status ? options.fn(this) : options.inverse(this);
            }
        }
    });
}

exports.update = async (req, res) => {
    const postID = req.params.postID;
    const data = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        status: req.body.status,
        author_id: req.body.auther
    }
    const a = await postModel.update(postID, data);
    return res.redirect('/admin/posts');
}