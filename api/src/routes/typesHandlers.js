const controllerGetTypes = require('./utils/typesControllers')

const getType = async(req,res)=>{
    try {
        var types = await controllerGetTypes();
        res.status(200).json(types)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
};

module.exports = getType;