
const allCubeData = [
    //:.
    [[0, 0, 0], [0, 0, 1], [1, 0, 0]],//0
    [[0, 0, 0], [0, 1, 0], [1, 0, 0]],//1
    [[0, 0, 0], [0, -1, 0], [1, 0, 0]],//2
    [[0, 0, 0], [0, 1, 0], [0, 0, 1]],//3
    [[0, 0, 0], [0, -1, 0], [0, 0, 1]],//4
    [[0, 0, 0], [0, 0, -1], [1, 0, 0]],//5
    [[0, 0, 0], [0, 1, 0], [-1, 0, 0]],//6
    [[0, 0, 0], [0, -1, 0], [-1, 0, 0]],//7
    [[0, 0, 0], [0, 1, 0], [0, 0, -1]],//8
    [[0, 0, 0], [0, 0, 1], [-1, 0, 0]],//9
    [[0, 0, 0], [0, -1, 0], [0, 0, -1]],//10
    [[0, 0, 0], [0, 0, -1], [-1, 0, 0]],//11

    //::
    [[0, 0, 0], [0, 0, 1], [1, 0, 0], [1, 0, 1]], //12
    [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 0]], //13
    [[0, 0, 0], [0, -1, 0], [1, 0, 0], [1, -1, 0]], //14
    [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1]], //15
    [[0, 0, 0], [0, 0, 1], [0, -1, 0], [0, -1, 1]], //16
    [[0, 0, 0], [0, 0, -1], [1, 0, 0], [1, 0, -1]], //17
    [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-1, 1, 0]], //18
    [[0, 0, 0], [0, -1, 0], [-1, 0, 0], [-1, -1, 0]], //19
    //....

    //.:.

    //:..

    //.:•

]

const allTurnData = [
    [1, 2, 3, 4], //0
    [5, 0, 6, 2], //1
    [0, 5, 1, 7],//2
    [8, 4, 9, 0],//3
    [3, 10, 0, 9],//4
    [2, 1, 8, 10],//5
    [11, 9, 7, 1],//6
    [9, 11, 2, 6],//7
    [10, 3, 11, 5],//8
    [6, 7, 4, 3],//9
    [4, 8, 5, 11],//10
    [7, 6, 10, 8],//11

    [13, 14, 15, 16],//12
    [17, 12, 18, 14],//13
    [12, 17, 13, 19],//14
    [0, 0, 0, 12],//15
    [0, 0, 12, 0],//16
    [14, 13, 0, 0],//17
    [0, 0, 0, 13],//18
    [0, 0, 14, 0],//19
]

const rows = 10;
const cols = 10;
const height = 8;

const chessList = Array.from({ length: height }, () =>
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
);
// chessList[0][5][5] = true;
// chessList[0][5][4] = true;
// chessList[0][4][1] = true;
// chessList[0][4][2] = true;

const currentChess = {
    position: [0, 0, 9],
    type: 14,
}

const isValidChess = (chess, list) => {
    return true
}

const turnChess = (trunType, chess, list) => {
    const type = allTurnData[chess.type][trunType]
    console.log('从', chess.type, '转', trunType, '到', type);
    const newChess = {position: chess.position, type: type}
    if (isValidChess(newChess, list)) {
        return newChess
    } else {
        return chess
    }
}



const cubePositionsWithPieces = (pieces) => {
    // console.log(pieces);
    const array = allCubeData[pieces.type]
    const position = pieces.position
    return array.map(p => [p[0] + position[0], p[1] + position[1], p[2] + position[2]])
}

export {
    rows, cols, height,
    chessList, currentChess,
    cubePositionsWithPieces,
    turnChess,
}