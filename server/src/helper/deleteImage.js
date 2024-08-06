const fs = require('fs').promises
const deleteImage = async (userImagePath) => {
    try {
        await fs.access(userImagePath);
        await fs.unlink(userImagePath)
        console.log("usr image was deleted")

    } catch (error) {
        console.error('user image does not exits')
    }
}

module.exports = {deleteImage}