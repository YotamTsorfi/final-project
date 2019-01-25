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

    mongoDBCon: async function() {
        console.log("connect to db");
        let credentials = {
            url: "@ds161224.mlab.com",
            port: "61224",
            db: "trans_social_rent",
            username: "shimi",
            password: "primenum13",
            collection: "transportation"
        };

        let url = "mongodb://" + credentials.username + ':' + credentials.password +  credentials.url + ':' + credentials.port + '/' + credentials.db;

        try {

            var db = mongojs(url, [credentials.collection]);
            return db;

        } catch (error) {
            console.log(error);
            errRes.errDesc = "error to connect mongoDB";
            return errRes;
        }
    },
    getBikes: async function() {
        console.log("get bikes ");
        try {
            
            let db = await this.mongoDBCon();

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
            let db = await this.mongoDBCon();

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
            console.log("update bike ", bikeId);
            let db = await this.mongoDBCon();

            var res = await new Promise(function(resolve, reject) {
                db.transportation.findOne({
                    _id: mongojs.ObjectId(bikeId)
                }, function(err, bike) {
                    if(err) reject(err);
                    console.log(bike);
                    resolve(bike);
                })
                // find all named 'mathias' and increment their level
                db.transportation.update({_id: bikeId}, {type: 'electric'}, function (err, bike) {
                    if(err) reject(err);
                    resolve(bike);
                })

                // let updatesBike = await this.getBike(bikeId);
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