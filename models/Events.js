const { Model, DataTypes } = require('sequelize');
const { DataTypes } = require('sequelize/types');
const sequelize = require('../config/connection');

class Event extends Model {}
Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
     
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    event_date: {
      type: DataTypes.DATE,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
