// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express from "express";
import {
    userSignUpValidator,
    userSignInValidator
} from "../../validators";
import {
    userSignUpController
} from "../../controllers";

// user router
const userRouter = express.Router();

// signup api
userRouter.post("/signup", userSignUpValidator, userSignUpController);

// login api
userRouter.post("/signin", userSignInValidator);

// delete user
userRouter.delete('/user');
