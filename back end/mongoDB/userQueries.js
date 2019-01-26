var mongoCon = require('./mongoCon');
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
                    userId: mongojs.ObjectId(userId)
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
    },
    updateBike: async function(bikeId, body) {

        try {
            console.log("update bike ", bikeId, body.type);
            let db = await this.mongoDBCon();

            var res = await new Promise(function(resolve, reject) {
                // update bike by id
                db.transportation.findAndModify({
                    query: { _id: "5c41ac88fb6fc0600be31c9b"},
                    update: { $set: { type: body.type } },
                    new: true
                }, function (err, bike) {
                    if(err) reject(err);
                    resolve(bike);
                })

                return res;

              }).catch((err) => {
                  console.log("error in mongoos", err);
                  errRes.errDesc = "bike doesn't exist";
                  return errRes;
              });

              return res;

        } catch (error) {
            console.log(error);
            return error;
        }
    },
    
};