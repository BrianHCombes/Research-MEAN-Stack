module.exports = require('./env/' + process.env.NODE_ENV + '.js');   

// called by publicMEANFserver.js 

// The environment configuration file stuff is explained in the
// Environment configuration file section in the tutorial this SelfEd
// is based on at:
// https://hackhands.com/mongodb-crud-mvc-way-with-passport-authentication/
//
// The process.env.NODE_ENV variable is actaully equal to: < development >
// and thus the whole line refers to the development.js file as a requirement.
// The process.env.NODE_ENV variable is a global environment variable and is
// defined and explained a bit better in the server.js file. Yup it traverses
// a maze of files before it gets here.
//