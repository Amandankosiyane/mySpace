const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
        mongoose.connect(mongoUrl);
        const spaceSchema = mongoose.Schema({
                username: String,
                email: String,
                password : String
        });

        const Space = mongoose.model('Space', spaceSchema);

        return {
                Space
        };
}
