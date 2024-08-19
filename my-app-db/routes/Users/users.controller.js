const mongoose = require("mongoose");
const { UserModel } = require("./users.model");

const jwt = require("jsonwebtoken");
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const bcrypt = require("bcrypt");
const saltRounds = 10;

// payload is a data that we store inside jwt
function generateAccessToken(payload) {
    console.log("checking token", TOKEN_SECRET_KEY);
    console.log("payload", payload);

    const token = jwt.sign({ data: payload }, TOKEN_SECRET_KEY);
    console.log("checking for tokens", token);
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
            pincode,
            } = req.body;
        console.log("req body", req.body);

        if (!firstName || !lastName || !email || !password || !gender || !age || !phoneNumber || !street || !city || !state ||
            !nationality || !pincode) {

            return res.status(400).json({ message: "Please provide all the fields" });
        }

        if (!(gender === "Male" || gender === "Female" || gender === "Other")) {            //checking the gender
            return res.status(400).json({ message: "invalid gender" });
        }

        const ageToNumber = parseInt(age);              //converting age(string) to number
        // let obj=req.file;

        const existingUser = await UserModel.findOne({ email });                     //trying it without await keyword
        if (existingUser) {
            return res.status(400).json({ message: "Email has already been taken" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashed password", hashedPassword);

        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender,
            age: ageToNumber,
            phoneNumber,
            street,
            city,
            state,
            nationality,
            pincode,
            profilePic: req.file
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
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Your email-Id or password is incorrect" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);  //executes true/false
        if (!isPasswordMatch) {
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
const getUserDetailsByUserId = async (req, res) => {
    try {
        const id = req.params.userId;
        console.log("id", typeof id);
        const isValid = mongoose.isValidObjectId(id);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid user id" });
        }
        const user = await UserModel.findById(id);
        console.log("user", user)
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
        const user = await UserModel.find();
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
        const users = await UserModel.findById(id);
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

        const userUpdatedInfo = await UserModel.findByIdAndUpdate(
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
const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).send("All fields are required");
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("invalid id");
      }
      const users = await UserModel.findById(id);
      if (!users) {
        return res.status(404).send("User not found");
      }
      const user = await UserModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "User deleted successfully", data: user });
    } catch (error) {
      return res.status(500).json({ message: "Server failed" });
    }
  };
  


module.exports = { createUser, allUsers, userLogin, getUserDetailsByUserId, userUpdate, deleteUser };