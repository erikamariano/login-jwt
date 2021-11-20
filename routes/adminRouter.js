const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');

router.get('/', auth, (req, res) => {

    if(req.user.admin){
        res.send('This data can only be seen by an admin!')
    }        
    else{
        res.status(401).send('Access denied - Not an admin!');
    }
})

router.get('/free', auth, (req, res) => {
    res.send('This data can only be seen by a user that is logged in.!')
})



module.exports = router;