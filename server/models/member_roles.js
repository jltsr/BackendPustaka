const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_roles', {
    member_id: {
      type: DataTypes.STRING(4),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'members',
        key: 'member_id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'role_id'
      }
    },
    penalty_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    unpenalty_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'member_roles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "member_roles_pkey",
        unique: true,
        fields: [
          { name: "member_id" },
          { name: "role_id" },
        ]
      },
    ]
  });
};
