var bcrypt = require('bcrypt-nodejs');

var UserSchema =({
    userId: { type: String, unique: true },
    password: String,
    email: String,
});
