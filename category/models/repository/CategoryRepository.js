const { models: { Category } } = require('..');
const { Op } = require('sequelize');

//Dealing with data base operations
class CategoryRepository {
  async CreateCategory({ title,ar_title,description,ar_description,imageUrl,status }) {

      console.log(title,ar_title,description,ar_description,imageUrl)
      const category = await Category.create({
        title,
        ar_title,
        description,
        ar_description,
        image:imageUrl,
        status
      });
      
      console.log("from Repository",category)

      return category;
    
  }
  async FindCategory({id}){
    const category = await Category.findOne({where:{id:id}})
    return category
  }
  async EditCategory({id,title,description,ar_title,ar_description,image}){
    
    const category = await Category.update({title,description,ar_title,ar_description,image},{where:{id:id}})
    return category
  }
  async AllCategory(inputData){
    const {search,limit,offset} = inputData

    const categories = await Category.findAll({where: {
    [Op.or]: [
      { title: { [Op.like]: `%${search}%` } },
    ]
    
  },limit:limit,offset:offset})
    return categories
    
  }
  async countCategory(){
    const count = await Category.count()
    return count
  }
 async showCategory(id){
  const category = await Category.findOne({where:{id:id}})
  return category
 }
  async getCategoryIds(){
    const ids = await Category.findAll({ attributes: ['id']})
    return ids
  } 
  async deleteCategory(id){
    const deletedCategory = await Category.destroy({where:{id:id}})
    return deletedCategory
  }
  async categoryCount(){
    const count = await Category.count()
    return count
  }
}

module.exports= CategoryRepository;