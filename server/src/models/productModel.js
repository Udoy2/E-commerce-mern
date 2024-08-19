const { Schema,model } = require("mongoose");
// name , slug, description,price,quantity,sold,
// shipping,image
const productSchema = new Schema({
    name: {
        type: String,
        require: [true,'Product name is required'],
        trim:true,
        maxlength: [150,'The length of product name can"t exceed 150'],
        minlength: [3,'The length of product name can"t exceed 3'],

    },
    slug: {
        type: String,
        require: [true,'Product slug is required'],
        lowercase:true,
        unique:true,
    },
    description: {
        type: String,
        require: [true,'Product description is required'],
        trim:true,
        minlength: [3,'The length of product description can"t exceed 3'],

    },
    price: {
        type: Number,
        require: [true,'Product price is required'],
        trim:true,
        validate:{
            validator: (v) => v > 0,
            message: (props)=> `${props.value} is not a valid price! price must be grater than 0`
            
        }
    },
    price: {
        type: Number,
        require: [true,'Product quantity is required'],
        trim:true,
        validate:{
            validator: (v) => v > 0,
            message: (props)=> `${props.value} is not a valid quantity! quantity must be grater than 0`
            
        }
    },
    sold: {
        type: Number,
        require: [true,'Product sold quantity is required'],
        trim:true,
        default:0,

    },
    address:{
        type: Number,
        default:0,
    },
    image:{
        type: Buffer,
        contentType:String,
        require: [false,'image is required'],
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    }
    
    
},{timestamps:true})

const Product = model('Products',productSchema);
module.exports = Product