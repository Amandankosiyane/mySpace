module.exports = function(models) {
        const index = function(req, res, next) {
                models.Space.find({}, function(err, reg) {
                        if (err) {
                                return next(err);
                        }
                        res.render('explore', {
                                reg
                        });
                });
        }

        const admin = function(req, res, next) {
                var tittle = req.body.tittle;
                // console.log(tittle);
                var author = req.body.author;
                // console.log(author);
                var image = req.body.image;
                // console.log(image);
                var description = req.body.description;
                // console.log(description);
                var category = req.body.category;
                // console.log(category);
                models.Space.findOne({
                        tittle: tittle,
                        author: author,
                        image: image,
                        description: description,
                        category: category
                }, function(err, results) {
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
                                }, function(err, results) {
                                        if (err) {
                                                return next(err)
                                        }
                                        // console.log("+++++++++++++++++", results);
                                        req.flash("error", "Successfully registered")
                                        res.render("explore", {
                                                results
                                        })
                                })
                                // console.log(results);
                        }
                })
        }

        const allBooks = function(req, res, next) {
                var categoryFilter = req.body.categoryFilter;
                models.Space.find({
                        category: {
                                '$regex':  categoryFilter
                        }
                }, function(err, cat) {
                        if (err) {
                                return next(err);

                        } else {
                                res.render('explore', {
                                        reg: cat
                                })
                                console.log(reg);
                                console.log(cat);
                        }

                })
        }

        return {
                index,
                admin,
                allBooks
        }
}
