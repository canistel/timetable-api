// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { appenvs } from "../utilities";
import mysql from "mysql";

// create connection
const connection = mysql.createConnection({
    host: appenvs.getDataBaseHost(),
    user: appenvs.getDataBaseUserName(),
    password: appenvs.getDataBasePassword(),
    database: appenvs.getDataBaseName()
});;

// connect to db
connection.connect((err) => {
    throw err;
});

// export
export default connection;