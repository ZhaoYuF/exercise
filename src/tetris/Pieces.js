
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
    [[0, 0, 0], [0, 0, 1], [-1, 0, 0], [-1, 0, 1]], //18
    [[0, 0, 0], [0, 0, -1], [0, 1, 0], [0, 1, -1]], //19
    [[0, 0, 0], [0, 0, -1], [0, -1, 0], [0, -1, -1]], //20
    [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-1, 1, 0]], //21
    [[0, 0, 0], [0, -1, 0], [-1, 0, 0], [-1, -1, 0]], //22
    [[0, 0, 0], [0, 0, -1], [-1, 0, 0], [-1, 0, -1]], //23

    //....
    [[0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0]], //24
    [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0]], //25
    [[0, 0, 0], [0, -1, 0], [0, -2, 0], [0, -3, 0]], //26
    [[0, 0, 0], [0, 0, -1], [0, 0, -2], [0, 0, -3]], //27
    [[0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 0, 3]], //28
    [[0, 0, 0], [-1, 0, 0], [-2, 0, 0], [-3, 0, 0]], //29

    //.:.
    [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [1, 0, 0]], //30
    [[0, 0, 0], [0, 0, -1], [-1, 0, 0], [1, 0, 0]], //31
    [[0, 0, 0], [0, 0, 1], [-1, 0, 0], [1, 0, 0]], //32
    [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [0, -1, 0]], //33
    [[0, 0, 0], [0, 1, 0], [0, -1, 0], [1, 0, 0]], //34
    [[0, 0, 0], [0, -1, 0], [-1, 0, 0], [1, 0, 0]], //35
    [[0, 0, 0], [0, 0, -1], [0, -1, 0], [0, 1, 0]], //36
    [[0, 0, 0], [0, 0, 1], [0, -1, 0], [0, 1, 0]], //37

    [[0, 0, 0], [0, 0, 1], [0, 0, -1], [-1, 0, 0]], //38
    [[0, 0, 0], [0, 0, 1], [0, 0, -1], [1, 0, 0]], //39
    [[0, 0, 0], [0, 0, 1], [0, 0, -1], [0, -1, 0]], //40
    [[0, 0, 0], [0, 0, 1], [0, 0, -1], [0, 1, 0]], //41

    //:..
    [[0, 0, 0], [0, 1, 0], [1, 0, 0], [2, 0, 0]], //42
    [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-2, 0, 0]], //43
    [[0, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, 2]], //44
    [[0, 0, 0], [0, 1, 0], [0, 0, -1], [0, 0, -2]], //45
    [[0, 0, 0], [0, -1, 0], [1, 0, 0], [2, 0, 0]], //46
    [[0, 0, 0], [0, -1, 0], [-1, 0, 0], [-2, 0, 0]], //47
    [[0, 0, 0], [0, -1, 0], [0, 0, 1], [0, 0, 2]], //48
    [[0, 0, 0], [0, -1, 0], [0, 0, -1], [0, 0, -2]], //49

    [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 2, 0]], //50
    [[0, 0, 0], [1, 0, 0], [0, -1, 0], [0, -2, 0]], //51
    [[0, 0, 0], [1, 0, 0], [0, 0, 1], [0, 0, 2]], //52
    [[0, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, -2]], //53
    [[0, 0, 0], [-1, 0, 0], [0, 1, 0], [0, 2, 0]], //54
    [[0, 0, 0], [-1, 0, 0], [0, -1, 0], [0, -2, 0]], //55
    [[0, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, 2]], //56
    [[0, 0, 0], [-1, 0, 0], [0, 0, -1], [0, 0, -2]], //57

    [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 2, 0]], //58
    [[0, 0, 0], [0, 0, 1], [0, -1, 0], [0, -2, 0]], //59
    [[0, 0, 0], [0, 0, 1], [1, 0, 0], [2, 0, 0]], //60
    [[0, 0, 0], [0, 0, 1], [-1, 0, 0], [-2, 0, 0]], //61
    [[0, 0, 0], [0, 0, -1], [0, 1, 0], [0, 2, 0]], //62
    [[0, 0, 0], [0, 0, -1], [0, -1, 0], [0, -2, 0]], //63
    [[0, 0, 0], [0, 0, -1], [1, 0, 0], [2, 0, 0]], //64
    [[0, 0, 0], [0, 0, -1], [-1, 0, 0], [-2, 0, 0]], //65


    //.:•
    [[0, 0, 0], [-1, 0, 0], [0, 1, 0], [1, 1, 0]], //66
    [[0, 0, 0], [-1, 0, 0], [0, -1, 0], [1, -1, 0]], //67
    [[0, 0, 0], [-1, 0, 0], [0, 0, -1], [1, 0, -1]], //68
    [[0, 0, 0], [-1, 0, 0], [0, 0, 1], [1, 0, 1]], //69
    [[0, 0, 0], [1, 0, 0], [0, 1, 0], [-1, 1, 0]], //70
    [[0, 0, 0], [1, 0, 0], [0, -1, 0], [-1, -1, 0]], //71
    [[0, 0, 0], [1, 0, 0], [0, 0, -1], [-1, 0, -1]], //72
    [[0, 0, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 1]], //73

    [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]], //74
    [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-1, -1, 0]], //75
    [[0, 0, 0], [0, 1, 0], [0, 0, 1], [0, -1, 1]], //76
    [[0, 0, 0], [0, 1, 0], [0, 0, -1], [0, -1, -1]], //77
    [[0, 0, 0], [0, -1, 0], [1, 0, 0], [1, 1, 0]], //78
    [[0, 0, 0], [0, -1, 0], [-1, 0, 0], [-1, 1, 0]], //79
    [[0, 0, 0], [0, -1, 0], [0, 0, 1], [0, 1, 1]], //80
    [[0, 0, 0], [0, -1, 0], [0, 0, -1], [0, 1, -1]], //81

    [[0, 0, 0], [0, 0, 1], [1, 0, 0], [1, 0, -1]], //82
    [[0, 0, 0], [0, 0, 1], [-1, 0, 0], [-1, 0, -1]], //83
    [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, -1]], //84
    [[0, 0, 0], [0, 0, 1], [0, -1, 0], [0, -1, -1]], //85
    [[0, 0, 0], [0, 0, -1], [1, 0, 0], [1, 0, 1]], //86
    [[0, 0, 0], [0, 0, -1], [-1, 0, 0], [-1, 0, 1]], //87
    [[0, 0, 0], [0, 0, -1], [0, 1, 0], [0, 1, 1]], //88
    [[0, 0, 0], [0, 0, -1], [0, -1, 0], [0, -1, 1]], //89

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
    [17, 12, 13, 13],//13
    [12, 17, 14, 14],//14
    [15, 15, 18, 12],//15
    [16, 16, 12, 18],//16
    [14, 13, 19, 20],//17
    [21, 22, 16, 15],//18
    [19, 19, 23, 17],//19
    [20, 20, 17, 23],//20
    [23, 18, 21, 21],//21
    [18, 23, 22, 22],//22
    [22, 21, 20, 19],//23

    [24, 24, 25, 26],//24
    [27, 28, 29, 24],//25
    [28, 27, 24, 29],//26
    [26, 25, 27, 27], //27
    [25, 26, 28, 28], //28
    [29, 29, 26, 25], //29

    [31, 32, 33, 34], //30
    [35, 30, 36, 36], //31
    [30, 35, 37, 37], //32
    [38, 38, 35, 30], //33
    [39, 39, 30, 35], //34
    [32, 31, 34, 33], //35
    [40, 41, 31, 31], //36
    [41, 40, 32, 32], //37
    [33, 33, 40, 41], //38
    [34, 34, 41, 40], //39
    [37, 36, 39, 38], //40
    [36, 37, 38, 39], //41

    [64, 60, 54, 51], //42
    [65, 61, 55, 50], //43
    [62, 59, 56, 52], //44
    [63, 58, 57, 53], //45
    [60, 64, 50, 55], //46
    [61, 65, 51, 54], //47
    [58, 63, 52, 56], //48
    [59, 62, 53, 57], //49
    [53, 52, 43, 46], //50
    [52, 53, 42, 47], //51
    [50, 51, 44, 48], //52
    [51, 50, 45, 49], //53
    [57, 56, 47, 42], //54
    [56, 57, 46, 43], //55
    [54, 55, 48, 44], //56
    [55, 54, 49, 45], //57
    [45, 48, 61, 60], //58
    [44, 49, 60, 61], //59
    [42, 46, 58, 59], //60
    [43, 47, 59, 58], //61
    [49, 44, 65, 64], //62
    [48, 45, 64, 65], //63
    [46, 42, 62, 63], //64
    [47, 43, 63, 62], //65

    [68, 69, 79, 74], //66
    [69, 68, 78, 75], //67
    [67, 66, 81, 77], //68
    [66, 67, 80, 76], //69
    [72, 73, 75, 78], //70
    [73, 72, 74, 79], //71
    [71, 70, 77, 81], //72
    [70, 71, 76, 80], //73
    [86, 82, 66, 71], //74
    [87, 83, 67, 70], //75
    [88, 85, 69, 73], //76
    [89, 84, 68, 72], //77
    [82, 86, 70, 67], //78
    [83, 87, 71, 66], //79
    [84, 89, 73, 69], //80
    [85, 88, 72, 68], //81
    [74, 78, 84, 85], //82
    [75, 79, 85, 84], //83
    [77, 80, 83, 82], //84
    [76, 81, 82, 83], //85
    [78, 74, 88, 89], //86
    [79, 75, 89, 88], //87
    [81, 76, 87, 86], //88
    [80, 77, 86, 87], //89
]

const rows = 10;
const cols = 10;
const height = 16;

// const currentChess = {
//     position: [5, height, 5],
//     type: 1
// }

const createPieces = () => {
    return {
        position: [5, height, 5],
        type: parseInt(Math.random() * 90)
    }
}

const chessList = Array.from({ length: cols }, () =>
    Array.from({ length: height }, () => Array.from({ length: rows }, () => false))
);
chessList[5][0][5] = true;
chessList[5][0][4] = true;
chessList[4][0][5] = true;
chessList[4][0][4] = true;

const copyPieces = (pieces) => {
    const newPieces = { ...pieces }
    newPieces.position = [pieces.position[0], pieces.position[1], pieces.position[2]]
    return newPieces
}

const cubePositionsWithPieces = (pieces) => {
    // console.log(pieces);
    const array = allCubeData[pieces.type]
    const position = pieces.position
    return array.map(p => [p[0] + position[0], p[1] + position[1], p[2] + position[2]])
}


const isValidPieces = (pieces, list) => {
    const positions = cubePositionsWithPieces(pieces)
    for (let [x, y, z] of positions) {
        if (x < 0 || y < 0 || z < 0 || x >= cols || z >= rows) {
            return false
        }
        if (y < height) {
            if (list[x][y][z]) {
                return false
            }
        }
    }
    return true
}

const turnChess = (trunType, pieces, list) => {
    const type = allTurnData[pieces.type][trunType]
    // console.log('从', pieces.type, '转', trunType, '到', type);
    const newPieces = copyPieces(pieces)
    newPieces.type = type
    if (isValidPieces(newPieces, list)) {
        return newPieces
    } else {
        return pieces
    }
}


const downPieces = (pieces, list) => {
    const newPieces = copyPieces(pieces)
    newPieces.position[1] -= 1
    if (isValidPieces(newPieces, list)) {
        console.log("下");
        return newPieces
    } else {
        console.log("停");
        return pieces
    }
}

export {
    rows, cols, height,
    chessList,
    createPieces,
    cubePositionsWithPieces,
    turnChess, downPieces,
}