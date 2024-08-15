const { logger } = require('../controller/loggerController');

const fs = require('fs').promises
const deleteImage = async (userImagePath) => {
    try {
        await fs.access(userImagePath);
        await fs.unlink(userImagePath)
        logger.log("info","usr image was deleted")

    } catch (error) {
        logger.log("error","user image does not exits")
    }
}

module.exports = {deleteImage}