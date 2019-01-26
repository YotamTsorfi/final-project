var mongoCon = require('./mongoCon');
var mongojs = require('mongojs');
var errRes = {
    err: 1,
    errDesc: "",
    res: {}
};
/*
    connect to mongo db
*/
module.exports = {

    getUser: async function(userId) {

        try {

            console.log("get user ", userId);
            let db = await mongoCon.mongoDBCon();

            var res = await new Promise(function(resolve, reject) {
                db.users.findOne({
                    _id: mongojs.ObjectId(userId)
                }, function(err, user) {
                    if(err) reject(err);
                    resolve(user);
                })

              }).catch((err) => {
                  console.log("error in mongoos", err);
                  errRes.errDesc = "user doesn't exist";
                  return errRes;
              });

              return res;

        } catch (error) {
            errRes.errDesc = error;
            return errRes;
        }
    }
};