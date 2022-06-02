// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { authenticator } from "../../middleware";
import express from "express";
import { deleteScheduleController, getAllScheduleController, getScheduleController, patchScheduleController, postNewScheduleController } from "../../controllers"
import { patchScheduleValidator, postNewScheduleValidator } from "../../validators";

const scheduleRouter = express.Router();

scheduleRouter.post("/", authenticator, postNewScheduleValidator, postNewScheduleController);

scheduleRouter.get("/", authenticator, getAllScheduleController);

scheduleRouter.get("/:id", authenticator, getScheduleController);

scheduleRouter.get("/:id", authenticator, patchScheduleValidator, patchScheduleController);

scheduleRouter.get("/:id", authenticator, deleteScheduleController);

export default scheduleRouter;