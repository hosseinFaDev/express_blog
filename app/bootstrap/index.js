const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
let RedisStore = require("connect-redis")(session);
// const flash = require('connect-flash')

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
        secret: 'efrgtu5dergtg345ghhy435',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
        unset :'destroy'
    }))
    // app.use(flash())
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'));
    app.use('/static', express.static(path.join(__dirname, '../../public')));

}