const User = require("../models/userModel");
const createHttpError = require("http-errors");

const getUsers  = async (req,res,next)=>{
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;

        const searchRegExp = new RegExp(".*"+search+".*","i")
        const filter = {
            isAdmin: {$ne: true},
            $or:[
                {name: {$regex: searchRegExp}},
                {email: {$regex: searchRegExp}},
                {phone: {$regex: searchRegExp}},
            ]
        }
        const options = {password:0}
        const users = await User
                        .find(filter,options)
                        .skip((page-1)*limit)
                        .limit(limit)
        const count = await User.find(filter).countDocuments();
        if(!users) throw createHttpError(404,"no users found");
        res.status(200).send({
            message: "user were returned",
            users,
            pagination: {
                totalPage: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page -1 >0 ? page-1 : null,
                nextPage: page +1 <= Math.ceil(count/limit) ? page+1 : null
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {getUsers}