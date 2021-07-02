const router  = require('express').Router();
const User = require('../models/User');
const {registerValidation , loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//validate



router.post('/register', async (req,res)=>{


    //val
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //email repeat check
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send("email exists")

    //pass hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    


    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    try {
        const savedUser = await user.save()
        res.send({user : user._id})
    } catch (error) {
        res.status(400).send(error);
    }
});


//login
router.post('/login', async (req,res)=>{


    //val
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    //email repeat check
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send("email doesnt exist")

    //check pass
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("invalid pass")

    //create jwt and assign
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token)
    

    //if ok
    res.send("success")
  
});




module.exports = router;