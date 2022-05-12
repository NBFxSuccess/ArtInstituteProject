const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserEvents extends Model {}

UserEvents.init(
    {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'event',
          key: 'id',
        },
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user_events',
    }
  );
  
  module.exports = UserEvents;
  