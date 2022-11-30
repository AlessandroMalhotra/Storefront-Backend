import express from 'express';
import { app } from "../../server";
import supertest from 'supertest';
import { Order } from '../../Models/orders';

const server = supertest(app);

describe('Test Order endpoint methods', () => {
    // order tests need doing 
});