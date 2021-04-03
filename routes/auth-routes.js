const router=require('express').Router();
const passport=require('passport');
router.get('/login',(req,res)=>{
    res.render('login',{user: req.user});
});

router.get('/logout',(req,res)=>{
   // res.send('logging out');
   req.logout();
   res.redirect('/');

});

// router.get('/register',(req,res)=>{
//     res.send(`Welcome to register Page`)
// })

router.get('/google',passport.authenticate('google',{
	scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google') ,(req,res)=>{
	//res.send(req.user);
	res.redirect('/profile/');
});
module.exports=router;