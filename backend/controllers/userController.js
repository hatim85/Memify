import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const signup = async (req, res, next) => {
    const { address,token } = req.body;

    if (!address || address.trim() === '') {
        return res.status(400).json({ message: 'Address is required' });
    }

    try {
        const existingUser = await User.findOne({ address });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = new User({ address });
        await newUser.save();

        const usertoken = jwt.sign(
            { userId: newUser._id, address: newUser.address },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie("token", usertoken, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict",
        });

        res.status(201).json({
            message: 'Signup successful',
            token:usertoken,
            user: {
                id: newUser._id,
                address: newUser.address
            }
        });

    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    const { address } = req.body;

    if (!address || address.trim() === '') {
        return res.status(400).json({ message: 'Address is required' });
    }

    try {
        const validUser = await User.findOne({ address });
        if (!validUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign(
            { userId: validUser._id, address: validUser.address },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie("token", token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict",
        });

        res.status(200).json({
            message: 'Signin successful',
            token,
            user: {
                id: validUser._id,
                address: validUser.address
            }
        });

    } catch (error) {
        next(error);
    }
};

const signout = (req, res, next) => {
    try {
        res.clearCookie('token')
            .status(200)
            .json({ message: 'Signout successful' });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res) => {
    try {
        const { address } = req.params;
        const user = await User.findOne({ address });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { signin, signup, signout, getUser };
