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
                }, function(err, bike) {
                    if(err) reject(err);
                    console.log(bike);
                    resolve(bike);
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

                db.transportation.findAndModify({
                    query: { _id: mongojs.ObjectId(bikeId) },
                    update: { $set: body },
                    new: true
                }, function (err, bike) {
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
    createBike: async function(bike) {

        try {
            console.log("create bike ", bike);
            let db = await mongoCon.mongoDBCon();

            var res = await new Promise(function(resolve, reject) {

                let bikeInfo = db.transportation.insert(bike);
                resolve("creating bike");
                return bikeInfo;

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
    deleteBike: async function(bikeId) {

        try {
            console.log("delete bike ", bikeId);
            let db = await mongoCon.mongoDBCon();

            var res = await new Promise(function(resolve, reject) {

                let bikeInfo = db.transportation.remove( { _id: mongojs.ObjectId(bikeId) });

                resolve("delete bike");

                return bikeInfo;

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
    }
    
};