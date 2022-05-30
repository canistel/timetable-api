// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { authenticator } from "../../middleware";
import express from "express";
import {
    getAllTimetablesController
} from "../../controllers";

// user router
const timeTableRouter = express.Router();

// get all timetables
timeTableRouter.get("/", authenticator, getAllTimetablesController);