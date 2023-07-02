import {HttpStatusCode} from 'axios';
import {Request, Response} from 'express';
import {Action} from '../framework/type';
import {
    getUserById,
    updateUser
} from '../service/users.service';
import {getTicTacToe, getUserList, makeMoveInGame, startTicTacToeGame} from "../service/game.service";

const startGame: Action = {
    method: 'post',
    path: '/game',
    action: (request: Request, response: Response) => {
        let userId = request.header('user_id');

        if (userId && !getUserById(userId.toString())) {
            return response.status(401).send({
                error: `User ` + getUserById(userId.toString()).username + ` doesn't exists`,
            });
        }
        const oponentId = request.body.oponentId;
        if (!getUserById(oponentId)) {
            return response.status(HttpStatusCode.BadRequest).send({
                error: `Oponent doesn't exists`,
            });
        }

        if (userId && (getUserById(userId).isPlaying || getUserById(oponentId).isPlaying)) {
            return response.status(HttpStatusCode.BadRequest).send({
                error: `One of the players is in game`,
            });
        }
        if (userId) {
            const user = getUserById(userId);
            user.isPlaying = true;
            updateUser(user);

            const oponent = getUserById(oponentId);
            oponent.isPlaying = true;
            updateUser(oponent);

            startTicTacToeGame(userId, oponentId)
            return response.status(HttpStatusCode.Ok).send();
        }
    }

}

const makeMove: Action = {
    method: "patch",
    path: "/game",
    action: (request: Request, response: Response) => {
        let userId = request.header('user_id')
        if (userId && !getUserById(userId.toString())) {
            return response.status(401).send({
                error: `User ` + getUserById(userId.toString()).username + ` doesn't exists`,
            });
        }
        const x = request.body.x;
        const y = request.body.y;
        if (userId) {
            const res = makeMoveInGame(userId, x, y);
            if (res == null) {
                return response.status(400).send({
                    error: `You are not in any game or it's not your turn or you are trying to make move in wrong place`,
                });
            }

        }
        return response.status(HttpStatusCode.Ok).send();
    }
}


const getGame: Action = {
    method: "get",
    path: "/game",
    action: (request: Request, response: Response) => {
        let userId = request.header('user_id')
        if (userId && !getUserById(userId.toString())) {
            return response.status(401).send({
                error: `User ` + getUserById(userId.toString()).username + ` doesn't exists`,
            });
        }
        response.json(getTicTacToe(userId!));
    }
}

const getGameUsers: Action = {
    method: "get",
    path: "/users/game/:gameId",
    action: (request: Request, response: Response) => {
        const gameId = request.params.gameId;
        response.json(getUserList(gameId));
    }
}
export default [startGame, makeMove, getGame, getGameUsers];
