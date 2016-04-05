/* jslint node: true */
var process = require('process');
var GithubStrategy = require('passport-github2');

var login = require('hapi-passport')(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:8000/"
    },
    function (accessToken, refreshToken, profile, done) {
        //        User.findOrCreate({
        //            githubId: profile.id
        //        }, function (err, user) {
        //            return done(err, user);
        //        });
        console.log(profile);
        done(null, {
            name: 'User Jedd',
        });
    }
));

module.exports = function (state) {
    return {
        method: 'get',
        path: '/github',
        handler: login({
            successRedirect: '/',
            errorRedirect: '/error.html',
            failRedirect: '/error.html',
        }),
        config: {
            cors: {
                origin: ['*'],
            },
        },
    };
};