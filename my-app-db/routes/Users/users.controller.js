const { default: mongoose } = require("mongoose");
const { userModel } = require("./users.model");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

// payload is a data that we store inside jwt
function generateAccessToken(payload) {
    console.log("checking token",TOKEN_SECRET_KEY);
    console.log("payload",payload);

    const token=jwt.sign({data:payload}, TOKEN_SECRET_KEY);
    console.log("checking for tokens",token);
    return token;
   
}

//new user-SignUp
const createUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            gender,
            age,
            phoneNumber,
            street,
            city,
            state,
            nationality,
            pincode } = req.body;

        if (!firstName || !lastName || !email || !password || !gender || !age || !phoneNumber || !street || !city || !state ||
            !nationality || !pincode) {

            return res.status(400).json({ message: "Please provide all the fields" });
        }

        const existingUser = await userModel.findOne({ email });
        // console.log ("working without await",existingUser);                         //trying it without await keyword
        if (existingUser) {
            return res.status(400).json({ message: "Email has already been taken" });
        }

        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password,
            gender,
            age,
            phoneNumber,
            street,
            city,
            state,
            nationality,
            pincode
        });

        await newUser.save();
        return res.status(200).json({ message: "Sign Up successfull", data: newUser });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

//User-Login-------------------------------------------------------------------------------------------------------

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill the email and pw fields" });
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Your email-Id or password is incorrect" });
        }
        if (password !== user.password) {
            return res
                .status(404)
                .json({ message: "Email or password id incorrect." });
        }
        console.log("checking access Token for user", user);
        // const copyUser = { ...user };
        // console.log("before copy user", copyUser);
        // delete copyUser.password;
        // console.log("copy user", copyUser);
        console.log("checking");
        const accessToken = generateAccessToken(user._id);
       
        return res.status(200).json({ message: "User login successfully", data: user, accessToken });

    } catch (error) {
        return res.status(500).json({ message: "Server failed" });
    }
};

//find user with id-------------------------------------------------------------------------------------------------
const userId = async (req, res) => {
    try {
        const id = req.params.userId;
        console.log("id", typeof id);
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "It's an authorized user", data: user });

    } catch (error) {
        return res.status(500).json({ message: "Server failed" });
    }
};

//get all user->for Admin
const allUsers = async (req, res) => {
    try {
        const user = await userModel.find();
        return res.status(200).json({ message: "List of all users", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Server failed" });
    }
};

//CRUD operations-----------------------------------------------------------------------------------------------
//Update the data of user

const userUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("All fields are required");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("invalid id");
        }
        const users = await userModel.findById(id);
        if (!users) {
            return res.status(404).send("User not found");
        }
        const { firstName,
            lastName,
            email,
            password,
            gender,
            age,
            phoneNumber,
            street,
            city,
            state,
            nationality,
            pincode } = req.body;

        let updatingField = {};

        if (firstName) {
            updatingField.firstName = firstName;
        }
        if (lastName) {
            updatingField.lastName = lastName;
        }
        if (email) {
            updatingField.email = email;
        }
        if (password) {
            updatingField.password = password;
        }
        if (gender) {
            updatingField.gender = gender;
        }
        if (age) {
            updatingField.age = age;
        }
        if (phoneNumber) {
            updatingField.phoneNumber = phoneNumber;
        }
        if (street) {
            updatingField.street = street;
        }
        if (city) {
            updatingField.city = city;
        }
        if (state) {
            updatingField.state = state;
        }
        if (nationality) {
            updatingField.nationality = nationality;
        }
        if (pincode) {
            updatingField.pincode = pincode;
        }

        const userUpdatedInfo = await userModel.findByIdAndUpdate(
            id,
            updatingField,
            { new: true }
        );
        return res.status(200).json({ message: "User details updated sucesfully", data: userUpdatedInfo });

    } catch (error) {
        console.error("Errors occured while updating", error);
        return res.status(500).json({ message: "Server Down" })
    }
};

//Delete the user---------------------------------------------------------------------------------------------------------------



module.exports = { createUser, allUsers, userLogin, userId, userUpdate };