// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { 
    userDetailsController,
    userPostController, 
    userSignInController,
    userPatchController, 
    userDeleteController 
} from "./userController";
import {
    getAllTimetablesController,
    postNewTimetableController,
    getTimetableController,
    patchTimetableController,
    deleteTimetableController
} from "./timetableController";

import {
    getAllScheduleController, 
    postNewScheduleController,
    getScheduleController,
    patchScheduleController,
    deleteScheduleController
} from "./scheduleController"

export {
    userDetailsController,
    userPostController,
    userSignInController, 
    userDeleteController,
    userPatchController,
    getAllTimetablesController,
    postNewTimetableController,
    getTimetableController,
    patchTimetableController,
    deleteTimetableController,
    getAllScheduleController,
    getScheduleController,
    postNewScheduleController,
    patchScheduleController,
    deleteScheduleController
};
