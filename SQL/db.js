var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an 'sudo npm install -g mysql'. */

/* You'll need to fill the following out with your mysql username and password.
 * database: 'chat' specifies that we're using the database called
 * 'chat', which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

//use this to refactor later
// var executeQuery = function(query, param, cb){
//   if (!cb) {
//     cb = param;
//     dbConnection.query(query, function(err, results){
//       cb(err, results);
//     });
//   } else {
//     dbConnection.query(query, param, function(err, results){
//       cb(err, results);
//     });
//   }
// };


exports.findAllMessages = function(cb){
  var query = 'SELECT messages.id, messages.text, messages.roomname, users.username\n' +
              'FROM messages LEFT OUTER JOIN users ON messages.userid\n' +
              'ORDER BY messages.id DESC';
  dbConnection.query(query, cb);
};

exports.findUser = function(username, cb){
  var query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
  dbConnection.query(query, username, cb);
};

exports.saveUser = function(username, cb){
  var query = 'INSERT INTO users (username) VALUE (?)';
  dbConnection.query(query, username, cb);
};

exports.saveMessage = function(message, userid, roomname, cb){
  var query = 'INSERT INTO messages (userid, text, roomname) VALUE (?, ?, ?)';
  var param = [userid, message, roomname];
  dbConnection.query(query, param, cb);
};
