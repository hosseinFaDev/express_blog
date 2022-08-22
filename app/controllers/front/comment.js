const postModel = require('../../models/post/index');
const commentModel = require('../../models/comment/index');
exports.store = async (req,res) => {
    const {user_email,user_name,user_comment} = req.body;
    const post = await postModel.findBySlug(req.params.post_slug);
    if(!post){
        return res.redirect('/404');
    }
    const commentData = {
        author_id:'user' in req.session ? req.session.user.id :null ,
        post_id :post[0].id,
        user_name,
        user_email,
        comment :user_comment

    }
    const result = await commentModel.create(commentData);
    if(result){
        res.redirect(`/p/${post[0].slug}`)
    }
    
}