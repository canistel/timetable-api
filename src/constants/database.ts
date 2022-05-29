// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { appenvs } from "../utilities";
import mysql from "mysql2";

// create connection
const connection = mysql.createPool({
    host: appenvs.getDataBaseHost(),
    user: appenvs.getDataBaseUserName(),
    password: appenvs.getDataBasePassword(),
    database: appenvs.getDataBaseName(),
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0
});;

// export
export default connection;
