'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./rootz-core.min.js');
} else {
    module.exports = require('./rootz-core.dev.js');
}
