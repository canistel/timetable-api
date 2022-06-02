// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


import { Request, Response } from "express"
import { mysqlPool, tableNames } from "../constants"
import { ISchedule } from "../interfaces"

// POST NEW SCHEDULE
export async function postNewScheduleController(req: Request, res: Response) {
    const timetable_id = res.locals.timetable_id as number | undefined;
    if (!timetable_id) { return res.status(500).json({ message: "Internal Server Error" }) }
    
    const start = res.locals.start as string;
    const end = res.locals.end as string;

    const description = req.body.description as string;

    const finished = res.locals.finished as boolean;

    const query = `INSERT INTO ${tableNames.SCHEDULE_TABLE} (timetable_id, start, end, description, finished) values(?, ?, ?, ?, ?)`

    const promisePool = mysqlPool.promise();

    await promisePool.execute<ISchedule[]>(query, [timetable_id, start, end, description, finished]);

    return res.status(200).json({ message: "Schedule added successfully" });
}

// GET ALL SCHEDULE
export async function getAllScheduleController(req: Request, res: Response) {
    const timetable_id = res.locals.timetable_id as number | undefined;
    if (!timetable_id) { return res.status(500).json({ message: "Internal Server Error" }) }

    const query = `SELECT * FROM ${tableNames.SCHEDULE_TABLE} where timetable_id = ?`

    const promisePool = mysqlPool.promise();
    const [rows] = await promisePool.execute<ISchedule[]>(query, [timetable_id]);

    const mappedRows = rows.map(row => {
        return { id: row.ID, timetable_id: row.TIMETABLE_ID, start: row.START, end: row.END, description: row.DESCRIPTION, finished: row.FINISHED }
    });

    return res.status(200).json(mappedRows);
}

// GET SPECIFIC SCHEDULE
export async function getScheduleController(req: Request, res: Response) {
    const timetable_id = res.locals.timetable_id as number | undefined;
    const id = +req.params.id;

    const query = `SELECT * FROM ${tableNames.SCHEDULE_TABLE} where timetable_id = ? and id = ?`

    const promisePool = mysqlPool.promise();

    const [rows] = await promisePool.execute<ISchedule[]>(query, [timetable_id, id]);

    if (rows.length === 0) { return res.status(404).json({ message: "Schedule not found" }) }

    const mappedRows = rows.map(row => {
        return { id: row.ID, timetable_id: row.TIMETABLE_ID, start: row.START, end: row.END, description: row.DESCRIPTION, finished: row.FINISHED }
    });

    return res.status(200).json(mappedRows[0]);
}

// PATCH SPECIFIC SCHEDULE
export async function patchScheduleController(req: Request, res: Response) {
    const timetable_id = res.locals.timetable_id as number | undefined;
    const id = +req.params.id;

    const start = res.locals.start as string;
    const end = res.locals.end as string;

    const description = req.body.description as string;

    const finished = res.locals.finished as boolean;
    
    const promisePool = mysqlPool.promise();
    const query = `SELECT * FROM ${tableNames.SCHEDULE_TABLE} where timetable_id = ? and id = ?`

    const [rows] = await promisePool.execute<ISchedule[]>(query, [timetable_id, id]);

    const newStart = start ?? rows[0].START;
    const newEnd = end ?? rows[0].END;
    const newDescription = description ?? rows[0].DESCRIPTION;

    if (!timetable_id) { return res.status(500).json({ message: "Internal Server Error" }) }
    
    const updateQuery = `UPDATE ${tableNames.SCHEDULE_TABLE} SET start = ?, end = ?, description = ? where timetable_id = ? and id = ?`

    await promisePool.execute<ISchedule[]>(updateQuery, [newStart, newEnd, newDescription, timetable_id, id]);

    return res.status(200).json({ message: "Schedule updated successfully" });
}

// DELETE SPECIFIC SCHEDULE
export async function deleteScheduleController(req: Request, res: Response) {
    const timetable_id = res.locals.timetable_id as number | undefined;
    const id = +req.params.id;

    if (!timetable_id) { return res.status(500).json({ message: "Internal Server Error" }) }

    const query = `DELETE FROM ${tableNames.SCHEDULE_TABLE} where timetable_id = ? and id = ?`;

    const promisePool = mysqlPool.promise();

    await promisePool.execute<ISchedule[]>(query, [timetable_id, id]);

    return res.status(200).json({ message: "Schedule deleted successfully" });
}
