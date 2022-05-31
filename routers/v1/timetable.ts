// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { authenticator } from "../../middleware";
import express from "express";
import {
    getAllTimetablesController,
    postNewTimetableController
} from "../../controllers";
import {
    postNewTimetableValidator
} from "../../validators";

// create user router
const timeTableRouter = express.Router();

// post timetable
timeTableRouter.post("/", authenticator, postNewTimetableValidator, postNewTimetableController);

// get all timetables
timeTableRouter.get("/", authenticator, getAllTimetablesController);

// export user router
export default timeTableRouter;
