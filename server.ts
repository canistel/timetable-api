// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { timeTableRouter, userRouter, scheduleRouter } from "./routers/v1";
import { appenvs } from "./utilities";
import express from "express";

// create app
const app = express();

// use json middleware
app.use(express.json());

// default route
app.get('/', (req, res) => res.status(200).json({ message: "Timetable API for Mini Project" }));

// v1 router
app.use('/api/v1/timetables', timeTableRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/timetable/:id/schedule', scheduleRouter);

// start app
app.listen(appenvs.getAppPort(), () => {
    console.log(`http://localhost:${appenvs.getAppPort()}`);
});
