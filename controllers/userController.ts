// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { mysqlPool, tableNames } from "../constants";
import { IUser, IJwtpayload } from "../interfaces";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { appenvs } from "../utilities";
import bcrypt from "bcrypt";

// controller for user details
export async function userDetailsController(req: Request, res: Response) {
    // get user id
    const userId = res.locals.user_id as number | undefined;

    // check valid
    if (!userId) { return res.status(500).json({ message: "Internal Server Error" }) }

    // user query
    const userQuery = `SELECT * FROM ${tableNames.USER_TABLE} WHERE id = ?`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // get user
    const [row] = await promisePool.execute<IUser[]>(userQuery, [userId]);

    // check valid
    if (row.length == 0) { return res.status(404).json({ message: "User not found" }) }

    // return user
    return res.status(200).json({ user_id: row[0].ID, username: row[0].USERNAME});
}

// controller for user sign up
export async function userPostController(req: Request, res: Response) {
    // get the request body
    const { username, password } = req.body;

    // salt rounds
    const saltRounds = 10;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create the query
    const query = `INSERT INTO ${tableNames.USER_TABLE} (username, password) VALUES (?, ?)`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // insert into DB
    await promisePool.execute<IUser[]>(query, [ username, hashedPassword ]);

    // return Status
    res.status(200).json({ message: "User Created" });
}

// controller for user sign in
export async function userSignInController(req: Request, res: Response) {
    // get the request body
    const { username, password } = req.body;

    // database query
    const query = `SELECT * FROM ${tableNames.USER_TABLE} WHERE username = ?`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // insert into DB
    const [rows] = await promisePool.execute<IUser[]>(query, [username]);

    // if user exits
    if(rows.length == 0) { return res.status(404).json({message: "Not Found"}) }

    // get hash password
    const hashedPassword = rows[0].PASSWORD;

    // compare the password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    // if password not valid
    if(!isPasswordValid) { return res.status(401).json({message: "Unauthorized"}) }

    // jwt payload
    const payload :IJwtpayload = { user_id: rows[0].ID };

    // generate token
    const token = jsonwebtoken.sign(payload, appenvs.getSecretKey());

    // send the token
    res.status(200).json({ username: rows[0].USERNAME, id: rows[0].ID, token: token });
}

// controller for user patch
export async function userPatchController(req: Request, res: Response) {
    // get user id
    const user_id = res.locals.user_id as number | undefined;

    // check user is found
    if (!user_id) { return res.status(500).json({ message: "Internal Server Error" }) };

    // get the user details
    const { username, password } = req.body;

    // get the user
    const userQuery = `SELECT * FROM ${tableNames.USER_TABLE} WHERE id = ?`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // get user
    const [row] = await promisePool.execute<IUser[]>(userQuery, [user_id]);

    // check user is found
    if (row.length == 0) { return res.status(404).json({ message: "User not found" }) };

    // values to update
    const updatedUsername = username || row[0].USERNAME;
    const updatedPassword = password || row[0].PASSWORD;

    // update query
    const updateQuery = `UPDATE ${tableNames.USER_TABLE} SET username = ?, password = ? WHERE id = ?`;

    // execute query
    await promisePool.execute<IUser[]>(updateQuery, [updatedUsername, updatedPassword, user_id]);

    // return status
    res.status(200).json({ message: "User Updated" });
}

// controller for user delete
export async function userDeleteController(req: Request, res: Response) {
    // get the request body
    const { password } = req.body;

    // user id
    const user_id = res.locals.user_id as number | undefined;

    // check user is found
    if (!user_id) { return res.status(500).json({ message: "Internal Server Error" }) };

    // database query
    const query = `SELECT * FROM ${tableNames.USER_TABLE} WHERE id = ?`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // insert into DB
    const [rows] = await promisePool.execute<IUser[]>(query, [user_id]);

    // if user exits
    if(rows.length == 0) { res.status(404).json({message: "Not Found"}) }

    // get hash password
    const hashedPassword = rows[0].PASSWORD;

    // compare the password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    // if password not valid
    if(!isPasswordValid) { res.status(401).json({message: "Unauthorized"}) }

    // delete the user
    const deleteQuery = `DELETE FROM ${tableNames.USER_TABLE} WHERE id = ?`;

    // delete from DB
    await promisePool.execute<IUser[]>(deleteQuery, [user_id]);

    // return Status
    res.status(200).json({ message: "Miss you if you are a gurl!" });
}
