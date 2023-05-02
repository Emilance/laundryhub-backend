const { Rating } = require("../Models/ratings")




const getAllRatings = async(req, res)=> {
    try {
        const ratings = await Rating.find().populate('user')
        res.status(200).send(ratings)
    } catch (error) {
        res.status(400).send(error)
    }
}




module.exports = {getAllRatings}