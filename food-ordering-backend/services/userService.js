const {handle_error, throw_custom_error} = require("../error/errorHandler");
const User = require("../models/user").User;

exports.find_all = () => {
    return User.find({})
        .then(users => {
            console.log(`Successfully retrieved ${users.length} users`);
            return users;
        });
};

exports.find_by_username = (username) => {
    return User.findOne({"credentials.username": username})
        .then(user => {
            if (user === null) {
                throw_custom_error(404, `No user exists with the username ${username}`);
            }
            console.log(`Successfully retrieved user by username ${user.credentials.username}`);
            return user;
        });
};

exports.find_by_credentials = (username, password) => {
    return User.findOne({credentials: {username: username, password: password}})
        .then(user => {
            if (user === null) {
                throw_custom_error(404, `Failed to log in! Invalid username ${username} or password ${password}!`);
            }
            console.log(`Successfully retrieved user by credentials {${user.credentials.username}, ${user.credentials.password}}`);
            return user;
        })
};

exports.insert_user = (user_data) => {
    // check for duplicate username
    return User.findOne({"credentials.username": user_data.username})
        .then(existingUser => {
            if (existingUser !== null) {
                console.log(existingUser);
                throw_custom_error(400, `Failed to insert new user: duplicate username! Username ${user_data.username} is already being used.`);
            } else {
                const user = new User({
                    credentials: {
                        username: user_data.username, password: user_data.password,
                    }, role: user_data.role
                });
                if (user.role === "CUSTOMER") {
                    user.firstname = user_data.firstname;
                    user.lastname = user_data.lastname;
                    user.address = user_data.address
                }

                return user.save()
                    .then(savedUser => {
                        console.log(savedUser)
                        console.log(`User with username ${savedUser.credentials.username} and id ${savedUser._id} has been successfully added!`)
                        return savedUser;
                    })
                    .catch((err) => {
                        console.log(err)
                        throw_custom_error(400, "Failed to insert new user! Invalid input data");
                    });
            }
        });
};