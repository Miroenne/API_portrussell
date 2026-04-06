const Catway = require('../models/catway');


exports.create = async (req, res) => {
    const tempCatway =({
        catwayNumber : req.body.catwayNumber,
        catwayType : req.body.catwayType,
        catwayState : req.body.catwayState
    });

    try{
        let catway = await Catway.create(tempCatway);
        res.render("pages/catways", { showConfirmModal : true});
    }catch(error){
        console.error("Erreur create catway: ", error);

        res.status(400).json({
            message : 'Erreur lors de la création du catway',
            name : error.name,
            code : error.code,
            errorMessage : error.message,
            errors : error.errors
        });
    }
}