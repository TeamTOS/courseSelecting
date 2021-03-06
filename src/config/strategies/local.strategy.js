const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app.local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'studentID',
    passwordField: 'password'
  }, (studentID, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'courseApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const col = db.collection('users');
        const user = await col.findOne({studentID});
        if ( !user ){
            done(null, false);
        } else if ( user.password === password){
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        console.log(err);
      }
      client.close();

    }());
  }));
};
