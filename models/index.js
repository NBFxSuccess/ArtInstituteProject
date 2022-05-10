const User = require('./Users');
const Event = require('./Events');

User.belongsToMany(Event, {
  foreignKey: 'user_id',
  through: 'user_events'
});

Event.belongsToMany(User, {
  foreignKey: 'user_id',
  through: 'user_events'
});

module.exports = { User, Event };
