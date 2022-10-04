const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('borrows', {
    borrow_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    borrow_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("dipinjam","sudah dikembalikan"),
      allowNull: true
    },
    book_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'books',
        key: 'book_id'
      }
    },
    member_id: {
      type: DataTypes.STRING(4),
      allowNull: false,
      references: {
        model: 'members',
        key: 'member_id'
      }
    }
  }, {
    sequelize,
    tableName: 'borrows',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "borrows_pkey",
        unique: true,
        fields: [
          { name: "borrow_id" },
        ]
      },
    ]
  });
};
