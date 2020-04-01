const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { User } = require('../server/models/User');
const keys = require('./default');


const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtPrivateKey
};


module.exports = (passport) => {
    passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload._id);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (error) {
            console.log(error);

        }



    }))

}