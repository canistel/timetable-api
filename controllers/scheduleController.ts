// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


import { Request, Response } from "express"
import { mysqlPool, tableNames } from "../constants"
import { ISchedule, IUser, ITimetable } from "../interfaces"

// GET ALL SCHEDULE
export async function getAllScheduleController(req: Request, res: Response) {
    // get the timetable id
    const timetable_id = +(req.params.timetable_id);

    // user id
    const user_id = +(res.locals.user_id);

    // create promise pool
    const promisePool = mysqlPool.promise();

    // verify that user has access to this timetable
    const vQuery = `SELECT * FROM ${tableNames.TIMETABLE_TABLE} WHERE user_id = ? AND timetable_id = ?`;
    
    // execute query
    const [urows] = await promisePool.query<ITimetable[]>(vQuery, [user_id, timetable_id]);

    // if no rows found
    if (urows.length === 0) { return res.status(404).send("No timetable found"); return; }

    // sql query for schedules
    const sQuery = `SELECT * FROM ${tableNames.SCHEDULE_TABLE} where timetable_id = ?`

    // query from database
    const [srows] = await promisePool.execute<ISchedule[]>(sQuery, [timetable_id]);

    // map rows to object
    const mappedRows = srows.map(row => {
        return { 
            timetable_id: row.TIMETABLE_ID, 
            id: row.ID, 
            start: row.START, 
            end: row.END, 
            description: row.DESCRIPTION, 
            finished: row.FINISHED 
        }
    });

    // return the result
    return res.status(200).json(mappedRows);
}


// POST NEW SCHEDULE
export async function postNewScheduleController(req: Request, res: Response) {
    // get the values from the body
    const timetable_id = +(req.params.timetable_id);
    const start = new Date(req.body.start);
    const end = new Date(req.body.end);
    const description = req.body.description;
    const finished = req.body.finished === 'true';

    // user id
    const user_id = +(res.locals.user_id);

    // create promise pool
    const promisePool = mysqlPool.promise();

    // verify that user has access to this timetable
    const vQuery = `SELECT * FROM ${tableNames.TIMETABLE_TABLE} WHERE user_id = ? AND timetable_id = ?`;
    
    // execute query
    const [urows] = await promisePool.query<ITimetable[]>(vQuery, [user_id, timetable_id]);

    // if no rows found
    if (urows.length === 0) { return res.status(404).send("No timetable found"); return; }

    // sql query string
    const query = `INSERT INTO ${tableNames.SCHEDULE_TABLE} (timetable_id, start, end, description, finished) values(?, ?, ?, ?, ?)`

    // query from database
    await promisePool.execute<ISchedule[]>(query, [timetable_id, start, end, description, finished]);

    // return the status
    return res.status(200).json({ message: "Schedule added successfully" });
}

// GET SPECIFIC SCHEDULE
export async function getScheduleController(req: Request, res: Response) {
    // get the values from the url
    const timetable_id = +(req.params.timetable_id);
    const id = +(req.params.id);

    // user id
    const user_id = +(res.locals.user_id);

    // create promise pool
    const promisePool = mysqlPool.promise();

    // verify that user has access to this timetable
    const vQuery = `SELECT * FROM ${tableNames.TIMETABLE_TABLE} WHERE user_id = ? AND timetable_id = ?`;
    
    // execute query
    const [urows] = await promisePool.query<ITimetable[]>(vQuery, [user_id, timetable_id]);

    // if no rows found
    if (urows.length === 0) { return res.status(404).send("No timetable found"); return; }

    // sql query string
    const query = `SELECT * FROM ${tableNames.SCHEDULE_TABLE} where timetable_id = ? and id = ?`

    // query from database
    const [rows] = await promisePool.execute<ISchedule[]>(query, [timetable_id, id]);

    // if no rows found
    if (rows.length === 0) { return res.status(404).json({ message: "Schedule not found" }) }

    // map rows to object
    const mappedRows = rows.map(row => {
        return { 
            timetable_id: row.TIMETABLE_ID,
            id: row.ID,  
            start: row.START, 
            end: row.END, 
            description: row.DESCRIPTION, 
            finished: row.FINISHED 
        }
    });

    // return result
    return res.status(200).json(mappedRows[0]);
}

// PATCH SPECIFIC SCHEDULE
export async function patchScheduleController(req: Request, res: Response) {
    // get the values from the body
    const timetable_id = +(req.params.timetable_id);
    const id = +(req.params.id);
    const start = req.body.start ?? new Date(req.params.start);
    const end = req.body.end ?? new Date(req.params.end);
    const description = req.body.description;
    const finished = req.body.finished ?? req.body.finished === 'true';

    // user id
    const user_id = +(res.locals.user_id);

    // create promise pool
    const promisePool = mysqlPool.promise();

    // verify that user has access to this timetable
    const vQuery = `SELECT * FROM ${tableNames.TIMETABLE_TABLE} WHERE user_id = ? AND timetable_id = ?`;
    
    // execute query
    const [urows] = await promisePool.query<ITimetable[]>(vQuery, [user_id, timetable_id]);

    // if no rows found
    if (urows.length === 0) { return res.status(404).send("No timetable found"); return; }

    // sql query string
    const query = `SELECT * FROM ${tableNames.SCHEDULE_TABLE} where timetable_id = ? and id = ?`

    // query from database
    const [rows] = await promisePool.execute<ISchedule[]>(query, [timetable_id, id]);

    // if no rows found
    if (rows.length === 0) { return res.status(404).json({ message: "Schedule not found" }) }

    // create new string
    const newStart = start ?? rows[0].START;
    const newEnd = end ?? rows[0].END;
    const newDescription = description ?? rows[0].DESCRIPTION;
    const newFinished = finished ?? rows[0].FINISHED;

    // sql query string
    const updateQuery = `UPDATE ${tableNames.SCHEDULE_TABLE} SET start = ?, end = ?, description = ? finished = ? where timetable_id = ? and id = ?`

    // query from database
    await promisePool.execute<ISchedule[]>(updateQuery, [newStart, newEnd, newDescription, newFinished, timetable_id, id]);

    // return the status
    return res.status(200).json({ message: "Schedule updated successfully" });
}

// DELETE SPECIFIC SCHEDULE
export async function deleteScheduleController(req: Request, res: Response) {
    // get the values from the url
    const timetable_id = +(req.params.timetable_id);
    const id = +(req.params.id);

    // user id
    const user_id = +(res.locals.user_id);

    // create promise pool
    const promisePool = mysqlPool.promise();

    // verify that user has access to this timetable
    const vQuery = `SELECT * FROM ${tableNames.TIMETABLE_TABLE} WHERE user_id = ? AND timetable_id = ?`;
    
    // execute query
    const [urows] = await promisePool.query<ITimetable[]>(vQuery, [user_id, timetable_id]);

    // if no rows found
    if (urows.length === 0) { return res.status(404).send("No timetable found"); return; }

    /// sql query string
    const getQuery = `SELECT * FROM ${tableNames.SCHEDULE_TABLE} where timetable_id = ? and id = ?`

    // query from database
    const [rows] = await promisePool.execute<ISchedule[]>(getQuery, [timetable_id, id]);

    // if no rows found
    if (rows.length === 0) { return res.status(404).json({ message: "Schedule not found" }) }

    // sql query string
    const deleteQuery = `DELETE FROM ${tableNames.SCHEDULE_TABLE} where timetable_id = ? and id = ?`;

    // query from database
    await promisePool.execute<ISchedule[]>(deleteQuery, [timetable_id, id]);

    // return the status
    return res.status(200).json({ message: "Schedule deleted successfully" });
}
