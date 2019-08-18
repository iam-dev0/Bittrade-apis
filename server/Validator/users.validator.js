const { body } = require('express-validator/check')

export const createUser =  [ 
        body('name', 'first_name Cannot be empty').exists(),
        body('email', 'Please enter a valid email address').exists().isEmail(),
        body('password',"Password should be at least 6 character long").exists().isLength({ min: 5 }),
       ]   


export const userLogin =  [ 
body('email', 'Please enter a valid email address').exists().isEmail(),
body('password',"Password should be at least 6 character long").exists().isLength({ min: 5 }),
]   
