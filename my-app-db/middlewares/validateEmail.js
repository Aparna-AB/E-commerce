//speciality of these middlewares functions,they can access req,res objects
//next is a function ,if all the functions are success then finally we call the next() function.

const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Enter the valid email" });
    }
    const emailRegexe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegexe.test(email)) {
        return res.status(400).json({ error: "Email format is not valid" });
    }
    //can check other validation if needed
      // if its use only for register/signup route then you can check if the email id already taken or not
    next();
}

module.exports = { validateEmail };