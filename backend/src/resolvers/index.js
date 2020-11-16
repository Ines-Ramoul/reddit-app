const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../../models/User')
const jwt = require('jsonwebtoken')

module.exports= {
    users : () => { 
      return User.find();
    },
    createUser: args => {
      return User.findOne({username : args.userInput.username})
      .then(user => {
        if (user) {
           throw new Error('User exists already')
        }
         return bcrypt.hash(args.userInput.password, 12);
      })
      .then(hashedPassword => {
       const user = new User({
         username : args.userInput.username,
         password: hashedPassword
       })
       return user.save();
      })
      .then(result => {
        return {...result._doc,password:null, _id: result.id}
      })
      .catch( err => { 
        throw err; 
       })     
    },
    login : async ({username, password}) => {
        const checkUser = await User.findOne({ username : username});
        if (!checkUser){
            throw new Error("User doesn't exist!");
        }
        const isEqual = await bcrypt.compare(password, checkUser.password);
        if (!isEqual){
            throw new Error("Password is incorrect !");
        }
        const token = jwt.sign({userId : checkUser.id, username : checkUser.username}, 'supersecretkey', {expiresIn : '1h'});
        return { userId: checkUser.id, token : token, tokenExpiration : 1 };
    }
  }