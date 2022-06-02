// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// post timetable validation schema
export async function postNewScheduleValidator(req: Request, res: Response, next: NextFunction) {
    // validation schema
    const schema = Joi.object().keys({
        description: Joi.string().min(1).max(500).required(),
        finished: Joi.boolean().required(),
        start: Joi.date().required(),
        end: Joi.date().required(),
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
export async function patchScheduleValidator(req: Request, res: Response, next: NextFunction) {
    // validation schema
    const schema = Joi.object().keys({
        description: Joi.string().min(1).max(500),
        finished: Joi.boolean(),
        start: Joi.date(),
        end: Joi.date(),
    });

    // validate
    try {
        await schema.validateAsync(req.body);
        next();
    } catch(err) {
        return res.status(400).json({ message: err });
    }
}
