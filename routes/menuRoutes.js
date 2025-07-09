const express = require('express');
const router = express.Router();

const Menu = require('../models/menu');

router.post('/', async (req, res) =>{
    try{
        const  data = req.body;
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log("menu saved successfully", response);

        res.status(201).json({
            message: 'Menu created successfully',
            menu: response
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/', async (req, res) =>{
    try{
         const data  = await Menu.find();

         res.status(200).json({
            message: 'Menu fetched successfully',
            menu: data
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:test', async (req,res)=>{
    try {
        const testType = req.params.test;
        if(testType == 'spicy' || testType == 'sweet' || testType == 'sour') {
            const response = await Menu.find({test: testType});
            console.log('response', response);
            res.status(200).json({
                message: `All ${testType} dishes fetched successfully`,
                menu: response
            });
        }else{
            return res.status(400).json({error: 'Invalid taste type'});
        }
            
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
        
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const response = await Menu.findByIdAndUpdate(id, data, {
            new:true,
            runValidators: true
        });

        if(!response){
            return res.status(404).json({error: 'Menu item not found'});
        }

        console.log("object updated successfully", response);
        res.status(200).json({
            message: 'Menu item updated successfully',
            menu: response
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'});
        
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const response= await Menu.findByIdAndDelete(id);

        if(!response){
            return res.status(404).json("menu not found", response);
        }
        console.log("Menu deleted successfully",response)
        res.status(200).json({
            message : "Menu deleted successfully",
            menu: response
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal server error'})
        
    }
})


module.exports = router;