const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  }
}

class Category extends Model {
  static associate (models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = {
  Category,
  CategorySchema,
  CATEGORY_TABLE
};
