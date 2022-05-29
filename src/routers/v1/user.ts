// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import express from "express";

// user router
const userRouter = express.Router();

// signup api
userRouter.post("/signup");

// login api
userRouter.post("/signin");

// delete user
userRouter.delete('/user');
