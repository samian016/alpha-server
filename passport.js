const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const passport = require("passport");

passport.use(
    new GoogleStrategy(
        {
            clientID: "370180400562-1qi5p9adnc5jj2i2tlhathqafv2lko9e.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    )
);



passport.use(
    new FacebookStrategy(
        {
            clientID: "2020554961458951",
            clientSecret: "58613b7b318469216ad9c67d549bb054",
            callbackURL: "/auth/facebook/mine",
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, profile);
            
        }
    )
);


// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: "2020554961458951",
//             clientSecret: "58613b7b318469216ad9c67d549bb054",
//             callbackURL: "http://localhost:3000/facebook/callback",
//         },
//         function (accessToken, refreshToken, profile, done) {
//             done(null, profile);
//         }
//     )
// );

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});