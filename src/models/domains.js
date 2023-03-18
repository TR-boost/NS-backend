const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('domains', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    domainName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    domainNameHash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tld_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tld',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'domains',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "domain_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
