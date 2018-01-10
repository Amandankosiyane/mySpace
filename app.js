module.exports = function(models){
        const landing = function(req, res, next) {
            models.Space.find({}, function(err, reg) {
                    if (err) {
                            return next(err);
                    }
                    res.render('register', {
                            reg
                    });
            });
    }

    const register = function(req,res,next){
            var username = req.body.username;
            var email = req.body.email;
            var password = req.body.password;
            models.Space.findOne({
                    username: username,
                    email: email,
                    password: password
            }, function(err,results){
                    if (err) {
                            return next()
                    }
                    if (!results) {
                            models.Space.create({
                                    username: username,
                                    email: email,
                                    password: password
                            }, function(err, results){
                                    if (err) {
                                            return next(err)
                                    }
                                    req.flash("error", "Successfully registered")
                                    res.render("register")
                            })
                            console.log(results);
                    }
            })
    }
        return {
                landing,
                register
        }
}
