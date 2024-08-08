const { Schema,model } = require("mongoose");
const bcrypt  = require("bcryptjs");
const { userDefaultImage } = require("../secret");

const useSchema = new Schema({
    name: {
        type: String,
        require: [true,'User name is required'],
        trim:true,
        maxlength: [31,'The length of user name can"t exceed 31'],
    },
    email: {
        type: String,
        require: [true,'Email is required'],
        trim:true,
        unique:true,
        lowercase: true,
        validate:{
            validator: function(v){
                return /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        require: [true,'User Password is required'],
        minlength: [3,'The length of user name can"t be less than 3'],
        set: (v)=>bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image:{
        type: Buffer,
        contentType:String,
        require: [true,'image is required'],
    },
    address:{
        type: String,
        require: [true,'address is required'],
    }
    ,
    phone:{
        type: String,
        require: [true,'phone is required'],
    }
    ,
    isAdmin:{
        type: Boolean,
        default:false
    },
    isBanned:{
        type: Boolean,
        default:false
    }
},{timestamps:true})

const User = model('Users',useSchema);
module.exports = User