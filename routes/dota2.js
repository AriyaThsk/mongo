const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/my_database')
//     .then(()=> console.log('Connected to MongoDB....'))
//     .catch(err => console.error('Could not connect..',err));

// const dota2Schema = new mongoose.Schema({
//     name: String,
//     localized_name: String,
//     date: {type: Date, default: Date.now},
// }, {
//       collection: 'heroDota2',
//       versionKey:false
// });

// const Dota2 = mongoose.model('heroDota2', dota2Schema);

router.get('/',(req,res) => {
    try{
        Dota2.find({}, function(err, hero){
            const findAllHero = hero;
            res.status(200).json({
                resultCode: 20000,
                resultDescription: findAllHero 
            })
        })

    }catch (error) {
        res.status(500).json({
            resultCode: 50000,
            resultDescription: error.message
        })

    }
})

// router.get('/:name',(req,res) => {
//     try{
//         const heroName = req.params.name;
//         console.log(heroName);
//         Dota2.findOne({name: heroName}, function(err, hero){
//             const findOneHero = hero;
//             res.status(200).json({
//                 resultCode: 20000,
//                 resultDescription: findOneHero 
//             })
//         })

//     }catch (error) {
//         res.status(500).json({
//             resultCode: 50000,
//             resultDescription: error.message
//         })

//     }
// })

router.get('/:id',(req,res) => {
    try{
        const id = req.params.id;
        console.log(id);
        Dota2.findOne({_id:id}, function(err, hero){
            const findOneHero = hero;
            res.status(200).json({
                resultCode: 20000,
                resultDescription: findOneHero 
            })
        })

    }catch (error) {
        res.status(500).json({
            resultCode: 50000,
            resultDescription: error.message
        })

    }
})

router.post('/', (req,res) => {
    try {
        const { name, localized_name } = req.body
        Dota2.findOne({name:name},function(err,findHero){
            const duplicate = findHero;
            if(duplicate){
                return res.status(409).json({
                    resultCode: 40900,
                    resultDescription: "Data Conflict"
                 })
            }else {
                const createHero = Dota2.create({
                    name:name,
                    localized_name: localized_name,
                    created: new Date()
                })
                console.log(createHero)
                res.status(201).json({
                    resultCode:20100,
                    resultDescription: `New Hero ${name} created!!`
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

router.put('/',(req,res) => {
    try{
        const {name,new_name} = req.body
        const filter = {name: name};
        const update = {name: new_name};
        Dota2.findOneAndUpdate(filter,update, function(err,updateHero){
            const updateHero2 = updateHero;
            res.status(200).json({
                resultCode: 20000,
                resultDescription: `New Hero ${name} updated!!`
            })
        })

    }catch (error) {
        res.status(500).json({
            resultCode: 50000,
            resultDescription: error.message
        })

    }
})

router.delete('/',(req,res) => {
    try{
        const {name} = req.body
        const filter = {name: name};

        Dota2.deleteOne(filter, function(err,deleteHero){
            const result = deleteHero;
            console.log(result);
            res.status(200).json({
                resultCode: 20000,
                resultDescription: `Delete Hero ${name}!!`
            })
        })
    }catch (error) {
        res.status(500).json({
            resultCode: 50000,
            resultDescription: error.message
        })

    }
})


// async function createHero() {
//   const dota2 = new Dota2({
//     name: 'bloodseeker',
//     localized_name: 'Bloodseeker'
//   });
//   const result = await dota2.save();
//   console.log(result);
// }

// async function findAllHero(){
//   const findAllHero = await Dota2.find({});
//   console.log(findAllHero);
// }

// async function findOneHero(){
//   const findOneHero = await Dota2.find({_id: "632a854e153aafd46eeefb45"});
//   console.log(findOneHero);
// }

// async function updateHero(){
//   const filter = {name: 'ABC'};
//   const update = {localized_name: 'AOOOOX'};
//   const updateHero = await Dota2.findOneAndUpdate(filter,update);
// }

// async function deleteOneHero(){
//   const deleteOneHero = await Dota2.deleteOne({name: 'ABC'});
//   console.log(deleteOneHero)
// }

// async function deleteManyHero(){
//   const deleteManyHero = await Dota2.deleteMany({name: 'bloodseeker'});
//   console.log(deleteManyHero)
// }



module.exports = router;