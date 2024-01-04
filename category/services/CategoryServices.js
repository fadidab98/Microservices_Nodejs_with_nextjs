const CategoryRepository = require ("../models/repository/CategoryRepository.js");
const { BadRequestError, ValidationError, ConflictError, NOTFoundError } = require("../utils/errors/app-errors.js");
const { FormData, uploadImageToCliudinary} = require ("../utils/index.js");

 class CategoryServices {

    constructor(){
        this.repository = new CategoryRepository();
       
      
    }
    async CreateCategory(inputData){
        const {title,ar_title,description,ar_description,image,status}=inputData
        const  imageUrl= await uploadImageToCliudinary(image)
   

        const category = await this.repository.CreateCategory({title,ar_title,description,ar_description,imageUrl,status});
        console.log("category ",category)
        return FormData(category)

    }
    async getAllCategory(inputData){
      const {search,limit,offset}= inputData
        const categories = await this.repository.AllCategory({search,limit,offset})
    
        console.log(categories)
        if(categories.length == 0)throw new NOTFoundError('categories not found!')

        return FormData(categories)
      }
      async CategoryCount(){
        const count = await this.repository.countCategory()
        
        return FormData(count)
      }
      async showCategory(id){
        const category = await this.repository.showCategory(id)
        if(!category)throw new NOTFoundError('Category Not Found!')
        return FormData(category);
      }
      async getCategoryIds(){
        const ids = await this.repository.getCategoryIds()
        return FormData(ids)
      }
      async deleteCategory(id){
        const deletedCategory= await this.repository.deleteCategory(id);
        return FormData(deletedCategory)
    
      }
      async categoryCount(){
        const count = await this.repository.categoryCount()
        return FormData(count)
      }
      
   
}
module.exports = CategoryServices;