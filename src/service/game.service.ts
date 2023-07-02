import {randomUUID} from "crypto";
import {getUserById, User} from "./users.service";

class TicTacToe {
    id: string;
    playerOne: string; // has circle sing
    playerTwo: string; // has cross sign
    turn: number // 0 when it's playerOne's turn and 1 if it's second player's turn
    board: string[][] = [[], [], []];
    isFinished: boolean;
    winnerId: null | string;

    constructor(playerOne: string, playerTwo: string) {
        if (Math.round(Math.random())) {
            this.playerOne = playerOne;
            this.playerTwo = playerTwo;
        } else {
            this.playerOne = playerTwo;
            this.playerTwo = playerOne;
        }
        this.id = randomUUID();
        this.isFinished = false;
        this.winnerId = null;
        this.turn = 1;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = "";
            }
        }
    }

    move = (userId: string, x: number, y: number) => {
        if (this.playerOne == userId) {
            this.board[y][x] = 'O';
            this.turn = 1;
        } else {
            this.board[y][x] = 'X';
            this.turn = 0;
        }
    }
}

export type Game = {
    "id": string,
    "sign": string,
    "turn": number,
    "board": string[][],
    "isFinished": boolean,
    "winnerId": null | string,
};

const games: TicTacToe[] = [];

export const startTicTacToeGame = (userId: string, oponentId: string) => {
    const game = new TicTacToe(userId, oponentId);
    games.push(game);
};

export const makeMoveInGame = (userId: string, x: number, y: number) => {
    let game = games.find(value => !value.isFinished && (value.playerOne == userId || value.playerTwo == userId));
    if (!game) {
        return null;
    }
    if ((game.playerOne == userId && game.turn == 1) || (game.playerTwo == userId && game.turn == 0)) {
        return null;
    }
    if (game.board[y][x] != "") {
        return null;
    }
    game.move(userId, x, y);
    // check if board is filled
    game.isFinished = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game.board[i][j] == "") {
                game.isFinished = false;
            }
        }
    }
    const winSign = getWinningUser(game);
    if (winSign == null) {
        game.winnerId = null;
    } else {
        game.winnerId = (winSign === 'X') ? game.playerTwo : game.playerOne;
    }

    return game;
};

const getWinningUser = (game: TicTacToe) => {
    if (game.isFinished) {
        getUserById(game.playerOne).isPlaying = false;
        getUserById(game.playerTwo).isPlaying = false;

        //check rows
        for (let i = 0; i < 3; i++) {
            if (game.board[i][0] == game.board[i][1] && game.board[i][0] == game.board[i][2]) {
                return game.board[i][1];
            }
        }
        //check columns
        for (let i = 0; i < 3; i++) {
            if (game.board[0][i] == game.board[1][i] && game.board[0][i] == game.board[2][i]) {
                return game.board[1][i];
            }
        }
        if (game.board[0][0] === game.board[1][1] && game.board[1][1] === game.board[2][2]) {
            return game.board[0][0];
        }
        if (game.board[0][2] === game.board[1][1] && game.board[1][1] === game.board[2][0]) {
            return game.board[0][2];
        }
    }
    return null;
}

export const getTicTacToe = (userId: string) => {
    let game = games.find(value => (value.playerOne == userId || value.playerTwo == userId));
    if (game === undefined) {
        return null;
    }
    const returnGame: Game = {
        id: game.id,
        board: game.board,
        turn: game.turn,
        winnerId: game.winnerId,
        isFinished: game.isFinished,
        sign: game.playerOne == userId ? 'circle' : 'cross'
    };
    return returnGame;
};

export const getUserList = (gameId: string) => {
    let game = games.find(value => value.id == gameId);
    if (game != undefined) {
        const list: User[] = [];
        list.push(getUserById(game.playerOne));
        list.push(getUserById(game.playerTwo));
        return list;
    }
};

