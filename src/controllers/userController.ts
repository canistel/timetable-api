// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { mysqlPool, tableNames } from "../constants";
import { Request, Response } from "express";
import { IUser } from "../interfaces";
import bcrypt from "bcrypt";

// controller for user sign up
export async function userSignUpController(req: Request, res: Response) {
    // get the request body
    const { username, password } = req.body;

    // salt rounds
    const saltRounds = 10;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create the query
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // insert into DB
    await promisePool.execute<IUser[]>(query, [ 
        username, hashedPassword 
    ]);

    // return Status
    res.status(200).json({ message: "User Created" });
}

// controller for user sign in
export async function userSignInController(req: Request, res: Response) {
    // get the request body
    const { username, password } = req.body;

    // database query
    const query = `SELECT * FROM users WHERE username = ?`;

    // promise pool
    const promisePool = mysqlPool.promise();

    // insert into DB
    const [rows] = await promisePool.execute<IUser[]>(query, [username]);

    // if user exits
    if(rows.length == 0) { res.status(404).json({message: "Not Found"}) }

    // get hash password
    const hashedPassword = rows[0].password;

    // compare the password
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    // if password not valid
    if(!isPasswordValid) { res.status(401).json({message: "Unauthorized"}) }
}
