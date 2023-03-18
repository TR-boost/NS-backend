const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tld', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tldName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tldNameHash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updateAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: "CURRENT_TIMESTAMP"
    }
  }, {
    sequelize,
    tableName: 'tld',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "tld_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
