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

    getBikes: async function() {
        console.log("get bikes ");
        try {
            
            let db = await mongoCon.mongoDBCon();

            var res = await new Promise(function(resolve, reject) {
                db.transportation.find((err, bikes) => {
                    if(err) reject(err);
                    resolve(bikes);
                });
              }).catch((err) => {
                  console.log("error in mongoos", err);
              });

              return res;

        } catch (error) {
            console.log(error);
            errRes.errDesc = "bikes not found";
            return errRes;
        }
    },
    getBike: async function(bikeId) {

        try {
            console.log("get one bike ", bikeId);
            let db = await mongoCon.mongoDBCon();

            var res = await new Promise(function(resolve, reject) {
                db.transportation.findOne({
                    _id: mongojs.ObjectId(bikeId)
                }, function(err, doc) {
                    if(err) reject(err);
                    console.log(doc);
                    resolve(doc);
                })

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
    updateBike: async function(bikeId, body) {

        try {
            console.log("update bike ", bikeId, body.type);
            let db = await mongoCon.mongoDBCon();

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