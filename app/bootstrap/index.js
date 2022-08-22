const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
let RedisStore = require("connect-redis")(session);


module.exports = (app) => {

    //redis Configs
    const { createClient } = require("redis");
    let redisClient = createClient({ legacyMode: true });
    redisClient.connect().catch(console.error);


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: true,
        secret: 'efrgtu5dergtg345ghhy435',
        cookie: { maxAge: 3600000 },
        resave: true,
        unset :'destroy'
    }))
    //express file upload configes
    app.use(fileUpload({
        createParentPath : true,
        useTempFiles:true 
    }));

    // handlebars configes
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));

    //static file configes
    app.use('/static', express.static(path.join(__dirname, '../../public')));

}