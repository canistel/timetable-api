// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { mysqlPool, tableNames } from "../constants";
import { Request, Response } from "express";
import { ITimetable } from "../interfaces";


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

// get the specific timetable
export async function getTimetableController(req: Request, res: Response) {
    // get user id
    const user_id = res.locals.user_id as number | undefined;

    // timetable id
    const id = +req.params.id;

    // check valid
    if (!user_id) { return res.status(500).json({ message: "Internal Server Error" }) }

    // query
    const query = `SELECT * from ${tableNames.TIMETABLE_TABLE} where user_id = ? and id = ?`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // get timetable
    const [rows] = await promisePool.execute<ITimetable[]>(query, [user_id, id]);

    // check if timetable exists
    if (rows.length === 0) { return res.status(404).json({ message: "Timetable not found" }) }

    // mapped rows
    const mappedRows = rows.map(row => {
        return { id: row.ID, user_id: row.USER_ID, description: row.DESCRIPTION }
    });

    // return
    return res.status(200).json(mappedRows[0]);
}

// PATCH the specific timetable
export async function patchTimetableController(req: Request, res: Response) {
    // get user id
    const user_id = res.locals.user_id as number | undefined;

    // timetable id
    const id = +req.params.id;

    // description
    const description = req.body.description as string;

    // promise pool
    const promisePool = mysqlPool.promise();

    // get timetable query
    const getTimetableQuery = `SELECT * from ${tableNames.TIMETABLE_TABLE} where user_id = ? and id = ?`;

    // get timetable
    const [rows] = await promisePool.execute<ITimetable[]>(getTimetableQuery, [user_id, id]);

    // check if timetable exists
    if (rows.length === 0) { return res.status(404).json({ message: "Timetable not found" }) }

    // description
    const newDescription = description ?? rows[0].DESCRIPTION;

    // check valid
    if (!user_id) { return res.status(500).json({ message: "Internal Server Error" }) }

    // query
    const updateQuery = `UPDATE ${tableNames.TIMETABLE_TABLE} SET description = ? where user_id = ? and id = ?`;

    // update timetable
    await promisePool.execute<ITimetable[]>(updateQuery, [newDescription, user_id, id]);

    // return
    return res.status(200).json({ message: "Timetable updated successfully" });
}


// delete the specific timetable
export async function deleteTimetableController(req: Request, res: Response) {
    // get user id
    const user_id = res.locals.user_id as number | undefined;

    // timetable id
    const id = +req.params.id;

    // check valid
    if (!user_id) { return res.status(500).json({ message: "Internal Server Error" }) }

    // query
    const query = `DELETE from ${tableNames.TIMETABLE_TABLE} where user_id = ? and id = ?`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // delete timetable
    await promisePool.execute<ITimetable[]>(query, [user_id, id]);

    // return
    return res.status(200).json({ message: "Timetable deleted successfully" });
}
