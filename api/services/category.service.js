const boom = require('@hapi/boom');
const { models }= require('./../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const categories = await this.find();
    const newData = await {
      ...data,
      id: categories.length + 1,
    }
    const newCategory = await models.Category.create(newData);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if(!category) {
      throw boom.notFound('user not found');
    }
    return category;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
