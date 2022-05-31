// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IUser, ITimetable, IJwtpayload } from "../interfaces";
import { mysqlPool, tableNames } from "../constants";
import { Request, Response } from "express";


// get all timetables
export async function getAllTimetablesController(req: Request, res: Response) {
    // user id
    const userId = res.locals.user_id as number | undefined;

    // check valid
    if (!userId) { return res.status(500).json({ message: "Internal Server Error" }) }

    // query
    const query = `SELECT * from ${tableNames.TIMETABLE_TABLE} where user_id = ?`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // get timetables
    const [rows] = await promisePool.execute<ITimetable[]>(query, [userId]);

    // mapped rows
    const mappedRows = rows.map(row => {
        return { id: row.ID, user_id: row.USER_ID, description: row.DESCRIPTION }
    });

    // return
    return res.status(200).json(mappedRows);
}

// post timetable controller
export async function postNewTimetableController(req: Request, res: Response) {
    // get user id
    const user_id = res.locals.user_id as number | undefined;

    // description
    const description = req.body.description as string;

    // check valid
    if (!user_id) { return res.status(500).json({ message: "Internal Server Error" }) }

    // query
    const query = `INSERT INTO ${tableNames.TIMETABLE_TABLE} (user_id, description) VALUES (?, ?)`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // post timetable
    await promisePool.execute<ITimetable[]>(query, [user_id, description]);

    // return
    return res.status(200).json({ message: "Timetable added successfully" });
}
