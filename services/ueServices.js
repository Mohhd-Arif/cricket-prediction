const { database } = require("pg/lib/defaults");
const models = require('../models');
const {addUe} = require('../controllers/ueController');

exports.addUe = async function addUe(data){ 
   console.log("we are inside ueServices");
   let task = await models.UserEquipments.build(data)    
   return await task.save()   

}

//filter by pathMode
exports.getEquipment = async (path) => {
    if(!path){
        return await models.UserEquipments.findAll();
    } else{
        console.log("pathMode",path);
        return await models.UserEquipments.findAll({
            where: {pathMode:path}
        });
    }      
}

