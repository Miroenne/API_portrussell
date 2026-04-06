const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');




exports.create = async (req, res) => {
    const tempUser = ({
        userName        : req.body.userName,
        email           : req.body.email,
        password        : req.body.password,
        accessLevel     : req.body.accessLevel
    }); 

    try{
        let user = await User.create(tempUser);
        res.status(200).json(user);
    }catch(error){
        console.error("Erreur create user: ", error);

        res.status(400).json({
        message             : "Erreur lors de la création de l'utilisateur",
            name            : error.name,
            code            : error.code,
            errorMessage    : error.message,
            errors          : error.errors
        });
    }
}



exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email : email}, '-__V -createAt -updateAt');

        if(user){
            bcrypt.compare(password, user.password, (err, response) => {

                if(err){
                    throw new Error(err);
                }
                if (response){
                    delete user._doc.password;

                    const expireIn = 60*60*24;
                    const token = jwt.sign({
                        user : user
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn : expireIn
                    });

                    res.cookie('token', token,
                    {
                        httpOnly : true,
                        sameSite : 'strict'
                    });

                    console.log('User logged successfully');

                    return res.redirect('/home');
                }
                console.log('Email ou mot de passe incorrect');
                res.redirect('/', {error: 'Email ou mot de passe incorrect'});
            });
        }else{
            return res.status(404).json({ message : 'utilisateur non trouvé'});
        }
    }catch(error){
        return res.status(501).json(error);
    }
}