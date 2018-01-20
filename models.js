const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
        mongoose.connect(mongoUrl);
        const spaceSchema = mongoose.Schema({
                tittle: String,
                author: String,
                image: String,
                description : String,
                category: String
        });

        const Space = mongoose.model('Space', spaceSchema);

        return {
                Space
        };
}
