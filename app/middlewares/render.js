module.exports = (app) => {

    app.use((req, res, next) => {

        let user = null;
        if ('user' in req.session) {
            user = req.session.user;
        }

        res.newRender = (template, options) => {
            options = { ...options, user };
            res.render(template, options);
        }
        res.frontRender = (template, options) => {
            options = {  layout:'front',bodyClass:'bg-gray' , ...options};
            res.render(template, options);
        }

        next();
    })



}