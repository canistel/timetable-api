// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { userRouter } from "./routers/v1";
import { appenvs } from "./utilities";
import express from "express";

// create app
const app = express();

// use json middleware
app.use(express.json());

// v1 router
app.use('/api/v1/user', userRouter);

// start app
app.listen(appenvs.getAppPort(), () => {
    console.log(`Running on ${appenvs.getAppPort()}`);
});
