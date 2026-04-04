const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');








exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email : email}, '-__V - createAt -updateAt');

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