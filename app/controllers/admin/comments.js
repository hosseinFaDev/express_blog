const commentModel = require('../../models/comment');
const userServices = require('../../services/userServices');
const dateServics = require('../../services/dateServices');
const commentStatus = require('../../models/comment/commentStatus');


exports.index = async (req, res) => {
    const comments = await commentModel.findAll();
    const presentPost = comments.map((comment) => {
        comment.userAvatar = userServices.gravatar(comment.user_email);
        comment.jalaliCreateAt = dateServics.toPersianDate(comment.created_at);
        return comment;
    })
    res.newRender('admin/comments/index', {
        layout: 'admin', presentPost, helpers: {
            commentBackground: function (status, options) {
                let cssClass = 'alert ';
                switch (true) {
                    case status == commentStatus.APPROVED:
                        cssClass += 'alert-success';
                        break;
                    case status == commentStatus.REJECTED:
                        cssClass += 'alert-danger';
                        break;
                    case status == commentStatus.REVIEW:
                        cssClass += 'alert-dark'
                        break;
                }
                return cssClass ;
            }
        }
    })

}

exports.approve = async (req, res) => {
    const commentID = req.params.commentID;
    const result = await commentModel.approve(commentID);
    return res.redirect('/admin/comments');

}
exports.reject = async (req, res) => {
    const commentID = req.params.commentID;
    const result = await commentModel.reject(commentID);
    return res.redirect('/admin/comments');

}
exports.delete = async (req, res) => {
    const commentID = req.params.commentID;
    const result = await commentModel.delete(commentID);
    return res.redirect('/admin/comments');

}