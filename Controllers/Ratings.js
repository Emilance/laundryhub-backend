const { Rating } = require("../Models/Rating")




const getAllRatings = async(req, res)=> {
    try {
        const ratings = await Rating.find().populate('user')
        res.status(200).send(ratings)
    } catch (error) {
        res.status(400).send(error)
    }
}




module.exports = {getAllRatings}