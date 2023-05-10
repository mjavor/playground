import { App, createApp } from '../../app';
import axios, {HttpStatusCode} from "axios";

const app = createApp();

describe('GET /ping', () => {
    it('should return 200 and \'ok\' message', async () => {
        const { status, data } = await axios.get('http://localhost:8000/ping');

        expect(status).toEqual(HttpStatusCode.Ok);
        expect(data).toStrictEqual({
            status: 'ok',
        });
    });
});


describe('POST /user', () => {
    it('should return bad request when password is too short', async () => {
        const { status, data } = await axios.post('http://localhost:8000/user',{
            username: 'dadadaaa',
            age: 31,
            plainPassword: 'd',
            acceptTermOfUse: true,
        },{ validateStatus: () => true });



        expect(status).toEqual(HttpStatusCode.BadRequest);
    });
});

describe('GET /user', () => {
    it('should return a list of users', async () => {
        const {status, data}  = await axios.get('http://localhost:8000/user');

        expect(status).toBe(200);
    });
});

describe('GET /user/:userId', () => {
    it('should return a user', async () => {
        const { status, data } = await axios.get('http://localhost:8000/user/123');

        expect(status).toBe(200);
    });
});

describe('DELETE /user/:userId', () => {
    it('should delete the user', async () => {
        const { status, data } = await axios.delete('http://localhost:8000/user/123');

        expect(status).toBe(200);
    });
});