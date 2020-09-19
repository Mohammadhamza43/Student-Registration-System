const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email Address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

userSchema.pre('save', async function (next) {
   const user = this;
   if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8);
   }
   next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id, password: user.password}, 'StdRegSystemMeanTest');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
      throw new Error('Invalid Login Credentials');
  }
  return user
};

const User = mongoose.model('User', userSchema);
module.exports = {User};
