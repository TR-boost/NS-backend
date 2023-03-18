var DataTypes = require("sequelize").DataTypes;
var _domains = require("./domains");
var _subdomains = require("./subdomains");
var _tld = require("./tld");
var _users = require("./users");

function initModels(sequelize) {
  var domains = _domains(sequelize, DataTypes);
  var subdomains = _subdomains(sequelize, DataTypes);
  var tld = _tld(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  subdomains.belongsTo(domains, { as: "domain", foreignKey: "domain_id"});
  domains.hasMany(subdomains, { as: "subdomains", foreignKey: "domain_id"});
  domains.belongsTo(tld, { as: "tld", foreignKey: "tld_id"});
  tld.hasMany(domains, { as: "domains", foreignKey: "tld_id"});
  domains.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(domains, { as: "domains", foreignKey: "user_id"});

  return {
    domains,
    subdomains,
    tld,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
