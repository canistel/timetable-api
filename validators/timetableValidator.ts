// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// post timetable validation schema
export async function postNewTimetableValidator(req: Request, res: Response, next: NextFunction) {
    // schema
    const schema = Joi.object().keys({
        description: Joi.string().min(1).max(500).required(),
    });

    // validate
    try {
        await schema.validateAsync(req.body);
        next();
    } catch(err) {
        return res.status(400).json({ message: err });
    }
}

// patch timetable validation schema
export async function patchTimetableValidator(req: Request, res: Response, next: NextFunction) {
    // schema
    const schema = Joi.object().keys({
        description: Joi.string().min(1).max(500),
    });

    // validate
    try {
        await schema.validateAsync(req.body);
        next();
    } catch(err) {
        return res.status(400).json({ message: err });
    }
}
