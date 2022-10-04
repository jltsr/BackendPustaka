const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    book_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    book_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    book_author: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    book_modified_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'books',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "books_pkey",
        unique: true,
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  });
};
