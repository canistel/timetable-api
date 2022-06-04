// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// validate the sign up request
export async function userPostValidator(req: Request, res: Response, next: NextFunction) {
    // validation schema
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    // validate
    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).json({ message: "Invalid Request" });
    }

    // propagate to next
    next();
}

// validate the sign in request
export async function userSignInValidator(req: Request, res: Response, next: NextFunction) {
    // validation schema
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });

    // validate
    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).json({ message: "Invalid Request" });
    }

    // propagate to next
    next();
}

// user patch validator
export async function userPatchValidator(req: Request, res: Response, next: NextFunction) {
    // validation schema
    const schema = Joi.object({
        username: Joi.string(),
        password: Joi.string()
    });

    // validate
    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).json({ message: "Invalid Request" });
    }

    // propagate to next
    next();
}

// validate the delete request
export async function userDeleteValidator(req: Request, res: Response, next: NextFunction) {
    // validation schema
    const schema = Joi.object({
        password: Joi.string().required()
    });

    // validate
    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        res.status(400).json({ message: "Invalid Request" });
    }

    // propagate to next
    next();
}
