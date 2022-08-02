const ueServices = require('../services/ueServices');
const models = require('../models');



exports.addEqp = async(req,res) =>{
    try{
    console.log("we are in controller",req.body);
    var data = req.body;
    let response = await ueServices.addUe(data)
    res.send(response);
    } catch(err){
         res.json({error:error.message});
    }
}


//function to filter data 
  exports.getEqp = async (req,res) => {
    try {
    let path = req && req.body.pathMode;
    let data = await ueServices.getEquipment(path);
    res.send(data);
    } catch (error) {  
      //res.status(500).json({error: error.message});
       res.json({error:error.message}) 
    }
  }