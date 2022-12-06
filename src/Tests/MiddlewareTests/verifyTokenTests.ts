import express from 'express';
import { NextFunction, Request, Response } from "express";
import { app } from "../../server";
import supertest from 'supertest';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';
import { User } from '../../Models/user';

const server = supertest(app);

describe('Test the verification of a Token', () => {
    
    const admin: User = {
        username: "admin",
        password: "admin"
    }

    let token: string;

    beforeAll(async () => {
        // sign in a admin user so that can use the token for the tests
        const response = await server.post('/users/signin').send(admin);
        expect(response.status).toBe(200);
        expect(response.body.token);
        token = response.body;
    })

    fit('Test that a token is valid from a successfull sign in.', async () => {
        // 
    })
})