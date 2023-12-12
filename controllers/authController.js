const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError.BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomError.BadRequestError("Email already in use");
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
    },
    token,
  });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
      throw new CustomError.BadRequestError('Please provide all values')
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
      throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
  
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
      throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({user, token})
  };

module.exports = {
  register,
  login
};