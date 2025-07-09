const express = require('express');
const router = express.Router();

const Person = require('../models/person');


router.post('/', async (req, res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("object saved successfully", response);

        res.status(201).json({
            message: 'Person created successfully',
            person: response
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});


router.get('/', async (req, res) =>{
    try{
        const data = await Person.find();
        res.status(200).json({
            message: 'All persons fetched successfully',
            persons: data
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }   
})

router.get('/:workType', async (req, res)=>{
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager') {
           
            const response = await Person.find({work: workType});
            console.log('response', response);
            res.status(200).json({
                message: `All ${workType}s fetched successfully`,
                persons: response
            });
        }else {
            return res.status(400).json({error: 'Invalid work type'});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
        
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id
        const updatedPerson = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPerson,{
            new: true, // return the updated document
            runValidators: true // validate the update against the schema
        })
        if(!response) {
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated successfully', response);
        res.status(200).json({
            message: 'Person updated successfully',
            person: response
        }) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response) {
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data deleted successfully', response);
        res.status(200).json({
            message: 'Person deleted successfully',
            person: response
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
        
    }
})


module.exports = router;