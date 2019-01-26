
/*
    validations
*/
module.exports = {

    name : function (field) {
        return /^[a-zא-תA-Z ]{2,40}$/.test(field);
    },
    password : function (field) {
        return !!field;
    },
    phone : function (field) {
        return /^0[0-9 -]{7,14}$/.test(field);
    },
    email : function (field) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(field);
    },
    in : function (field, arr) {
        return arr.indexOf(field) != -1;
    },
    id_no : function (field) {
        return /^[0-9]{8,9}$/.test(field) ;
    },
    full_name : function (field) {
        return /[a-zא-תA-Z]{2,30}( )+[a-zא-תA-Z]{2,30}/.test(field);
    },
    number : function (field) {
        return /^[0-9]{1,30}$/.test(field) ;
    }
    
};