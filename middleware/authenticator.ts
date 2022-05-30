// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Request, Response, NextFunction } from "express";
import { IJwtpayload } from "../interfaces";
import jsonwebtoken from "jsonwebtoken";
import { appenvs } from "../utilities";

/**
 * Authenticate the user with the token
 * 
 * @param req   request 
 * @param res   response
 * @param next  next function
 */
export default function authenticator(req: Request, res: Response, next: NextFunction) {
    // header
    const authHeader = req.headers.authorization;

    // if header is not present
    if(!authHeader) { return res.status(401).json({ message: "Not authenticated" }); }

    // get the token
    const token = authHeader.split(" ")[1];

    // check token
    if(!token) { return res.status(401).json({ message: "No token Found" }) }

    // verify the token
    try {
        const decoded = jsonwebtoken.verify(token, appenvs.getSecretKey()) as IJwtpayload;
        req.user_id = decoded.user_id;
        next();
    } catch (error) {
        res.status(401).json({ message: error });
    }
}
