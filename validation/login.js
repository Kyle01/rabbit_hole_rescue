const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.username = !Validator.isEmpty(data.username) ? data.username : "";
    data.password = !Validator.isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.username)) {
      errors.email = "Email field is required";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: Validator.isEmpty(errors)
    };
};