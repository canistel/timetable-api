// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RowDataPacket } from "mysql2";

// interface for sql query result
export default interface IUser extends RowDataPacket {
    ID: number;
    USERNAME: string;
    PASSWORD: string;
}
