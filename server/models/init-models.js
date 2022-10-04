import Sequelize from "sequelize";
import config from "../config/config";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect : 'postgres',
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    }
  }
)

var DataTypes = require("sequelize").DataTypes;
var _books = require("./books");
var _borrows = require("./borrows");
var _member_roles = require("./member_roles");
var _members = require("./members");
var _return_book = require("./return_book");
var _roles = require("./roles");

function initModels(sequelize) {
  var books = _books(sequelize, DataTypes);
  var borrows = _borrows(sequelize, DataTypes);
  var member_roles = _member_roles(sequelize, DataTypes);
  var members = _members(sequelize, DataTypes);
  var return_book = _return_book(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);

  members.belongsToMany(roles, { as: 'role_id_roles', through: member_roles, foreignKey: "member_id", otherKey: "role_id" });
  roles.belongsToMany(members, { as: 'member_id_members', through: member_roles, foreignKey: "role_id", otherKey: "member_id" });
  borrows.belongsTo(books, { as: "book", foreignKey: "book_id"});
  books.hasMany(borrows, { as: "borrows", foreignKey: "book_id"});
  return_book.belongsTo(borrows, { as: "borrow", foreignKey: "borrow_id"});
  borrows.hasMany(return_book, { as: "return_books", foreignKey: "borrow_id"});
  borrows.belongsTo(members, { as: "member", foreignKey: "member_id"});
  members.hasMany(borrows, { as: "borrows", foreignKey: "member_id"});
  member_roles.belongsTo(members, { as: "member", foreignKey: "member_id"});
  members.hasMany(member_roles, { as: "member_roles", foreignKey: "member_id"});
  member_roles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(member_roles, { as: "member_roles", foreignKey: "role_id"});

  return {
    books,
    borrows,
    member_roles,
    members,
    return_book,
    roles,
  };
}
const models = initModels(sequelize);
export default models
export {sequelize}
/*
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;*/
