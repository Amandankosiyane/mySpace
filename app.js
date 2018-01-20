module.exports = function(models){
        const landing = function(req, res, next) {
            models.Space.find({}, function(err, reg) {
                    if (err) {
                            return next(err);
                    }
                    res.render('admin', {
                            reg
                    });
            });
    }

    const admin = function(req,res,next){
            var tittle = req.body.tittle;
            console.log(tittle);
            var author = req.body.author;
            console.log(author);
            var image = req.body.image;
            console.log(image);
            var description = req.body.description;
            console.log(description);
            var category = req.body.category;
            console.log(category);
            models.Space.findOne({
                    tittle: tittle,
                    author: author,
                    image: image,
                    description: description,
                    category: category
            }, function(err,results){
                    if (err) {
                            return next()
                    }
                    if (!results) {
                            models.Space.create({
                                    tittle: tittle,
                                    author: author,
                                    image: image,
                                    description: description,
                                    category: category
                            }, function(err, results){
                                    if (err) {
                                            return next(err)
                                    }
                                    console.log("+++++++++++++++++", results);
                                    req.flash("error", "Successfully registered")
                                    res.render("explore", {
                                            results
                                    })
                            })
                            console.log(results);
                    }
            })
    }

            const readMore =  function(req,res,next){
                //     var tittle = req.body.tittle;
                //
                // //     var author= req.body.author;
                // //     var image = req.body.image;
                // //     var description = req.body.description
                //     models.Space.findOne({
                //             tittle: tittle
                //     }, function(err, foundBook){
                //             if (err) {
                //                     return next(err)
                //             }
                //             console.log("--------------------------------------------------------------", foundBook);
                //         //     req.flash("error", "Hello, " + username  + " lets see what you love...");
                //         // var message = "You have selected " + tittle.
                //             res.render('register', {
                //                     foundBook
                //             })
                //             console.log(foundBook);
                //     })
            }

        return {
                landing,
                admin,
                readMore
        }
}
