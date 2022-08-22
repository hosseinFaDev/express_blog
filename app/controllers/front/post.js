const postModel = require('../../models/post/index');
const userModel = require('../../models/user/index');
const commentModel = require('../../models/comment/index');
const jalali = require('../../services/dateServices');
const _ = require('lodash');
const settingModel = require('../../models/setting');

exports.showPost = async (req, res) => {
    let pageTitle = await settingModel.get('website_title');
    const postSlug = req.params.postSlug;
    const postData = await postModel.findBySlug(postSlug);

    //over write title and adding post title to blog title
    pageTitle = pageTitle + `|| ${postData[0].title}`;
   
    //adding jalali date to post's
    postData.map(post => {
        post.jalaliDate = jalali.toPersianDate(post);
        return post
    })
    if(!postData) {
        return res.redirect('/404')
    }
    
    //Adding auther name and description to post
    const fullPostData = postData[0];
    const user = await userModel.find(fullPostData.author_id);
    fullPostData.author = user.full_name;
    fullPostData.author_description = user.description;
    
    //Show Comments
    
    const commentsData = await commentModel.findByPostId(fullPostData.id);

    commentsData.map((comment => {
        comment.jalaliDate = jalali.toPersianDate(comment.created_at);
        return comment ;
    }))
    fullPostData.comments = commentsData;
    const newComments = _.groupBy(commentsData , 'parent');
    
    //check for is comment enable on
    const submitCommentEnable = parseInt(await settingModel.get('users_can_submit_comment'));


    //Final Render
    return res.frontRender('front/post/single',{
        fullPostData
         ,comments :newComments[0]
          , bodyClass:'single-post'
          ,pageTitle
          ,submitCommentEnable
          ,helpers : {
            hasChildren : function (commentId,options) {
                return commentId in newComments ;
            },
            getChildren : function(commentId,options){
                return newComments[commentId] ;
            }
          }
        });

}