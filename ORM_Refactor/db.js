var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', '');


var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Message = sequelize.define('Message', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

// puts a UserId column on each Message instance
Message.belongsTo(User);

User.sync();
Message.sync();


exports.User = User;
exports.Message = Message;
