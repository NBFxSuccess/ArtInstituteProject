const User = require('./Users');
const Event = require('./Events');
const UserEvents = require('./UserEvents');

User.belongsToMany(Event, {
  through: {model: UserEvents, },
  foreignKey: 'user_id'

});

Event.belongsToMany(User, {
  through: {model: UserEvents },
  foreignKey: 'event_id'

});

module.exports = { User, Event, UserEvents };
