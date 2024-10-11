import { Response } from "express";

interface ResponseDetails {
    message: string,
    data?:unknown,
    status?:number
}

interface ErrorResponseDetails {
    message: string,
    error?:unknown,
    status?:number
}

export const sendSuccess = (res: Response, {message, data, status}:ResponseDetails) => {
     return res.status(status || 200).json({message,data}).end();
}

export const sendError = (res: Response, {message, error, status}:ErrorResponseDetails) => {
     return res.status(status || 500).json({message, error}).end();
}