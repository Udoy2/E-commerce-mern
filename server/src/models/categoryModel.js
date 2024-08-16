const { Schema,model } = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        require: [true,'Category name is required'],
        trim:true,
        unique:true,
        minlength: [3,'The length of Category name can"t be less than 3'],
    },
    slug: {
        type: String,
        require: [true,'slug is required'],
        lowercase:true,
        unique:true,
    },

},{timestamps:true})

const Category = model('Users',categorySchema);
module.exports = Category