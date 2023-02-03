const express = require('express')
const cors = require('cors')
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user')
    .then(()=> console.log('Connected to MongoDB....'))
    .catch(err => console.error('Could not connect..',err));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
     },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        required: true
    }
}, {
    collection: 'user',
    versionKey:false
  });

const user = mongoose.model('user', userSchema);

router.post('/register',cors(), (req,res) => {
    try {
        const { username, password, email, phone, age } = req.body
        user.findOne({username:username},function(err,findUsername){
            const duplicate = findUsername;
            if(duplicate){
                return res.status(409).json({
                    resultCode: 40900,
                    resultDescription: "Data Conflict"
                 })
            }else {
                const createUser = user.create({
                    username: username,
                    password: password,
                    email: email,
                    phone: phone,
                    age: age,
                    created: new Date()
                })
                console.log(createUser)
                res.status(201).json({
                    resultCode:20100,
                    resultDescription: `New User ${username} created!`
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            resultCode: 50000,
            resultDescription: error.message
        })
    }
})

router.get('/user', cors(), (req,res) => {
    try{
        user.find({}, function(err, findUser){
            const findAllUser = findUser;
            res.status(200).json({
                resultCode: 20000,
                resultDescription: findAllUser
            })
        })

    }catch (error) {
        res.status(500).json({
            resultCode: 50000,
            resultDescription: error.message
        })

    }
})

router.post('/login',cors(), (req,res) => {
    try {
        const { email, password } = req.body
        user.findOne({email:email},function(err,findEmail){
            console.log(findEmail);
            if(!findEmail){
                return res.status(200).json({
                    resultCode: 40400,
                    resultDescription: 'Not found'
                })
            } else{
                if(findEmail.password!==password){
                    return res.status(200).json({
                        resultCode: 40400,
                        resultDescription: 'Not found'
                    })
                }

                res.status(200).json({
                    resultCode: 20000,
                    resultDescription: findEmail
                })
            }
            
        })
    
    } catch (error) {
        res.status(500).json({
            resultCode: 50000,
            resultDescription: error.message
        })
    }
})


module.exports = router;