const User = require('./User');
const Event = require('./Events');

User.belongsToMany(Event, {
  foreignKey: 'event_id',
});

Event.belongsToMany(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Event };
