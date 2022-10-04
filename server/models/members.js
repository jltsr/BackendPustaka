const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members', {
    member_id: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true
    },
    member_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    member_modified_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_pinjam: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'members',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "members_pkey",
        unique: true,
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
};
