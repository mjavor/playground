import {isValidUsername} from "../controllers/user.controller";
const request = require("supertest");
import { createApp } from '../app';

const app = createApp();
describe('isValidUsername', () => {
    it('should return true for a valid username', () => {
        const username = 'michal';
        expect(isValidUsername(username)).toBe(true);
    });

    it('should return false for an invalid username with length < 5', () => {
        const username = 'abc';
        expect(isValidUsername(username)).toBe(false);
    });

    it('should return false for an invalid username with length > 20', () => {
        const username = 'this_is_a_very_long_username';
        expect(isValidUsername(username)).toBe(false);
    });

    it('should return false for a non-string value', () => {
        const username = 123;
        expect(isValidUsername(username)).toBe(false);
    });
});

describe("GET /user", () => {
    it("should return a list of users", async () => {
        const res = await request(app.app).get(
            "/user"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET user/:id", () => {
    it("should return a user", async () => {
        const res = await request(app.app).get(
            "/user/123"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE user/:id", () => {
    it("should delete a user", async () => {
        const res = await request(app.app).delete(
            "/user/123"
        );
        expect(res.statusCode).toBe(200);
    });
});



describe('POST /user', () => {
    it('should return 400 if pin is too short', async () => {
        const res = await request(app.app)
            .post('/user')
            .send({
                username: 'testuser',
                pin: '123',
            });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            error: "'123' is not a valid PIN",
        });
    });

    it('should return 400 if pin is too long', async () => {
        const res = await request(app.app)
            .post('/user')
            .send({
                username: 'testuser',
                pin: '123456789012345678901',
            });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            error: "'123456789012345678901' is not a valid PIN",
        });
    });
});


