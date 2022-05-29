// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Get the db username
export function getDataBaseUserName() : string {
    return process.env.DB_USERNAME || "root";
}

// get the db password
export function getDataBasePassword() : string {
    return process.env.DB_PASSWORD || "";
}

// get the db name
export function getDataBaseName() : string {
    return process.env.DB_NAME || "";
}

// get the db host
export function getDataBaseHost() : string {
    return process.env.DB_HOST || "localhost";
}

// get the app port
export function getAppPort(): number {
    return process.env.APP_PORT && +process.env.APP_PORT || 3000;
}
