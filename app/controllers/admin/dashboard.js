const statistics = require('../../models/statistics');
exports.index = async (req,res) => { 
    const data = {
    totalUser : await statistics.totalUsers() ,
    totalPosts : await statistics.totalPosts() ,
    totalComments : await statistics.totalComments() ,
    totalViews : await statistics.totalViews()
    }

    res.newRender('admin/dashboard/index',{layout:'admin' , ...data});
}