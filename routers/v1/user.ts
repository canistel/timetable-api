// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { authenticator } from "../../middleware";
import express from "express";
import {
    userSignUpValidator,
    userSignInValidator,
    userPatchValidator,
    userDeleteValidator
} from "../../validators";
import {
    userDetailsController,
    userSignUpController,
    userSignInController,
    userPatchController,
    userDeleteController
} from "../../controllers";

// create user router
const userRouter = express.Router();

// delete user
userRouter.delete('/', authenticator, userDeleteValidator, userDeleteController);

// signup api
userRouter.post("/signup", userSignUpValidator, userSignUpController);

// signin api
userRouter.post("/signin", userSignInValidator, userSignInController);

// user details
userRouter.get('/', authenticator, userDetailsController);

// user patch
userRouter.patch('/', authenticator, userPatchValidator, userPatchController);

// export the user router
export default userRouter;
