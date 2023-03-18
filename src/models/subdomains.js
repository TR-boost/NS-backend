const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subdomains', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subdomainName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sudomainNameHash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    domain_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'domains',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'subdomains',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "subdomains_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
