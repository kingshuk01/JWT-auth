const router  = require('express').Router()
const verify = require('./verifyToken')

router.get('/',verify, (req,res)=>{
    res.json({
        posts: {
            title: 'my fosrt post',
            description : 'u shount access'
        }
    })
})

module.exports = router