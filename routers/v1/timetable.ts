// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { authenticator } from "../../middleware";
import express from "express";
import {
    getAllTimetablesController,
    postNewTimetableController,
    getTimetableController,
    patchTimetableController,
    deleteTimetableController
} from "../../controllers";
import {
    postNewTimetableValidator,
    patchTimetableValidator,
} from "../../validators";

// create user router
const timeTableRouter = express.Router({mergeParams: true});

// patch timetable
timeTableRouter.patch("/:id", authenticator, patchTimetableValidator, patchTimetableController);

// post timetable
timeTableRouter.post("/", authenticator, postNewTimetableValidator, postNewTimetableController);

// get all timetables
timeTableRouter.get("/", authenticator, getAllTimetablesController);

// get timetable
timeTableRouter.get("/:id", authenticator, getTimetableController);

// delete timetable
timeTableRouter.delete("/:id", authenticator, deleteTimetableController);

// export user router
export default timeTableRouter;
