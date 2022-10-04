const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('return_book', {
    return_book_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    borrow_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'borrows',
        key: 'borrow_id'
      }
    },
    return_book_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'return_book',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "return_book_pkey",
        unique: true,
        fields: [
          { name: "return_book_id" },
        ]
      },
    ]
  });
};
