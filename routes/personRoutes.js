const express = require('express');
const router = express.Router();
const person = require('./../models/person')

router.post('/', async(req, res) =>{
    try{
        const data = req.body;
        const newPerson = new person(data);

        const response = await newPerson.save();
        console.log('Data saved successfully');

        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: 'Internal error occured'
        });
    }
})
router.get('/', async (req, res)=>{
    try {
        const data = await person.find();
        console.log('Data fetched successfully');
        res.status(200).json(data);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal error occured'
        });
        
    }
});
router.get('/:workType', async(req, res) =>{
    try {
        const workType = req.params.workType;

        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response = await person.find({work: workType});
        
            console.log('responce fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: "Invalid work type"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal error occured'
        });
        
    }
});
router.put('/:id', async(req, res) =>{
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await person.findByIdAndUpdate(personId, updatePersonData,{
            new: true,
            runValidators: true,
        })
        if(!response){
            res.status(404).json({error: "error"})
        }
        console.log('data updated');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal error occured'
        });
        
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const personId = req.params.id;
        const response = await person.findOneAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'error'})
        }
        console.log('data updated');
        res.status(200).json({message: 'Data Deleted Successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal error occured'
        });
        
    }
})
module.exports = router;