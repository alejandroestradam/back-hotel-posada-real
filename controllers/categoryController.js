const Category = require('../models/Category');

const getCategories =  async (req,res) =>{
    try{
        const categories =  await Category.find();
         return res.json(categories);
    }catch(err){
        res.status(400).send(err);
    }
};

const createCategory = async (req, res) =>{
    const category = new Category({
        name: req.body.name,
        cost: req.body.cost,
        highlights: req.body.highlights,
        capacity: req.body.capacity,
        area: req.body.area,
        floors: req.body.floors,
        beds: req.body.beds,
        amenities: req.body.amenities,
        description: req.body.description,
        images_category: req.body.images_category
    });
    try{
        const savedCategory = await category.save();
        res.send(savedCategory);
    }catch(err){
        res.status(400).send(err);
    }
}

module.exports = {createCategory, getCategories};