var db = require('./db');
var serverHelpers = require('./server-helpers');

var User = db.User;
var Message = db.Message;

exports.postMessage = function(req, res) {
  serverHelpers.collectData(req, function(message){

    User.findOrCreate({username: message.username})
    .success(function(user){

      Message.create(message)
      .success(function(message){

        message.setUser(user)
        .success(function(message){

          serverHelpers.sendResponse(res, message);
        });
      });
    });
  });
};

exports.getMessages = function(req, res) {
  Message.findAll({ include: [User] })
  .success(function(messages, error){

      serverHelpers.sendResponse(res, messages);
    }
  );
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
