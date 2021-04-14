const router = require('express').Router()
const {isSignedIn,isCustomer, isAdmin,haveRightsForCompliant, isDeveloper} = require('../middleware/auth')
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
router.param('resolvedById',async (req,res,next,id)=>{
    try
    {
        let resolvedUser = await User.findOne({_id:id,role:1})
        if(!resolvedUser)
        {
            throw new Error()
        }
        req.resolvedByUser = resolvedUser
        next()
    }
    catch{
        res.send({
            error:"developer not found"
        })
    }
})
router.get('/getAllCustomersCount',isSignedIn,isAdmin,async (req,res)=>{
    try{
        const  customersCount = await User.count({role:0})
        console.log(`Customers count is ${customersCount}`)
        res.send({customersCount})
    }
    catch{
        res.status(400).send({
            error:"Cannot get customers count"
        })
    }
})
router.get('/getAllDevelopersCount',isSignedIn,isAdmin,async (req,res)=>{
    try{
        const  developersCount = await User.count({role:1})
        console.log(`Developers count is ${developersCount}`)
        res.send({developersCount})
    }
    catch(e){
        console.log(e)
        res.status(400).send({
            error:"Cannot get developers count"
        })
    }
})
router.get('/getAllDevelopers',isSignedIn,isAdmin,async (req,res)=>{
    try{
        const  developers = await User.find({role:1})
        res.send(developers)
    }
    catch{
        res.status(400).send({
            error:"Cannot get developers"
        })
    }
})

router.post('/addDeveloper',isSignedIn,isAdmin,[body('email',"enter correct email").isEmail(),body('password',"password should be minimum of 5 characters").isLength({min:5})],async (req,res)=>{
    try{
        const errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty())
        {
            return res.status(422).send({
                error:errors.array()[0].msg
            })
        }
        req.body.role = 1
        console.log(req.body)
        const developer = new User(req.body)
        await developer.save()
        //TODO: send password(req.body.password) to their mail account
        developer.password = undefined
        res.send(developer)
    }
    catch(e){
        console.log(e.name,e.code)
        if(e.code == 11000 && e.name == "MongoError")
        {
            return res.status(400).send({
                error:"Email is already exists"
            })
        }
        res.status(400).send({
            error:"Can't add developer please try again later"
        })
    }
})

router.put('/updateProfile',isSignedIn,[body('email',"enter correct email").isEmail()],async (req,res)=>{
    try{
        const errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty())
        {
            return res.status(422).send({
                error:errors.array()[0].msg
            })
        }
        let profile = req.body
        let updates = Object.keys(profile)
        for(let i=0;i<updates.length;i++)
        {
            req.profile[updates[i]] = req.body[updates[i]]
        }
        console.log(req.profile)
        profile = await req.profile.save()
        profile.password = undefined
        res.send(profile)
    }
    catch(e){
        console.log(e)
        if(e.code == 11000 && e.name == "MongoError")
        {
            return res.status(400).send({
                error:"Email is already exists"
            })
        }
        res.status(400).send({
            error:"Can't update developer please try again later"
        })
    }
})

router.delete('/deleteDeveloper/:resolvedById',isSignedIn,isAdmin,async (req,res)=>{
    try
    {
        const removedDeveloper = await req.resolvedByUser.remove()
        res.send({removedDeveloper})
    }
    catch
    {
        res.status(400).send({
            error:"Cannot remove developer"
        })
    }
})

module.exports = router
