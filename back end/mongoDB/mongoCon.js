/* connect mongoDB*/
var mongojs = require('mongojs');

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
    }
    
}
