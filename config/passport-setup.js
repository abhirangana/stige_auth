const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const LocalStrategy=require('passport-local').Strategy;
// const bcrypt=require('bcryptjs');
const keys = require('./keys');
const User = require('../models/user-model');
const mongoose = require('mongoose');

passport.serializeUser((user,done)=>{
     done(null,user.id);
});


passport.deserializeUser((id,done)=>{
     User.findById(id).then((user)=>{
            done(null,user);
         });
});
passport.use(
    new GoogleStrategy({
        // options for google strategy
                callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log(profile);
        User.findOne({googleId:profile.id}).then((currentUser)=>{
           // console.log(currentUser);
           // done(null,currentUser);
            if(currentUser){
                console.log('user is:',currentUser);
                done(null,currentUser);
            }else{
               	new User({
               		username: profile.displayName,
               		googleId: profile.id
                }).save().then((newUser) => {
                    console.log('new user created:', + newUser);
                    done(null,newUser);
                });
            }
        });
        
    })
);

// passport.use(
//     new LocalStrategy({usernameField:'email'},(email,password,done)=>{
//         //Match User
//         User.findOne({email:email})
//             .then(user=>{
//                 if(!user){
//                     return done(null,false,{message:'That email Id is not registered'});
//                 }
//                 //Match password
//                 bcrypt.compare(password,user.password,(err,isMatch)=>{
//                     if(isMatch){
//                         return done(null,user);
//                     }
//                     else{
//                         return done(null,false,{message:'Password Incorrect'});
//                     }
//                 })
//             })
//             .catch((err)=>console.log(err))
//     })
// )