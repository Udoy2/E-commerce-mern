const getUsers  = (req,res,next)=>{
    try {
        res.status(200).send({
            message: "user were returned",
    
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {getUsers}