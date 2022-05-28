// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { appenvs } from "./utilities";
import express from "express";

// create app
const app = express();

// simple
app.get('/', async (req, res) => {
    res.send("Hello, World");
});

// start app
app.listen(appenvs.getAppPort(), () => {
    console.log(`Running on ${appenvs.getAppPort()}`);
});
