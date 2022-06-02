// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { authenticator } from "../../middleware";
import express from "express";
import { 
    deleteScheduleController, 
    getAllScheduleController, 
    getScheduleController, 
    patchScheduleController, 
    postNewScheduleController,
} from "../../controllers"
import { 
    postNewScheduleValidator,
    patchScheduleValidator, 
} from "../../validators";

// create schedule router
const scheduleRouter = express.Router();

// create the new schedule
scheduleRouter.post("/", authenticator, postNewScheduleValidator, postNewScheduleController);

// get all the schedules
scheduleRouter.get("/", authenticator, getAllScheduleController);

// get schedule by id
scheduleRouter.get("/:id(^\\d+$)", authenticator, getScheduleController);

// patch schedule by id
scheduleRouter.patch("/:id(^\\d+$)", authenticator, patchScheduleValidator, patchScheduleController);

// delete schedule by id
scheduleRouter.delete("/:id(^\\d+$)", authenticator, deleteScheduleController);

// export router
export default scheduleRouter;
