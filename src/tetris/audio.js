

const player = {
    bg: new Audio('/audio/bg.mp3'),
    move: undefined,
    rotation: undefined,
    score: undefined,
    fail: undefined,
}

player.bg.volume = 0.1
player.bg.loop = true

const audioContext = {
    playBackgroundMusic: () => {
        player.bg.play();
    },

    pauseBackgroundMusic: () => {
        player.bg.pause();
    },

    playMoveMusic: () => {
        if (!player.move) {
            player.move = new Audio('/audio/move.mp3');
            player.move.volume = 1.0;
            player.move.loop = false;
        }
        player.move.currentTime = 0;
        player.move.play();
    },

    playRotationMusic: () => {
        if (!player.rotation) {
            player.rotation = new Audio('/audio/rotation.mp3');
            player.rotation.volume = 1;
            player.rotation.loop = false;
        }
        player.rotation.currentTime = 0;
        player.rotation.play();
    },

    playScoreMusic: () => {
        if (!player.score) {
            player.score = new Audio('/audio/score.mp3');
            player.score.volume = 1;
            player.score.loop = false;
        }
        player.score.currentTime = 0;
        player.score.play();
    },

    playFailMusic: () => {
        if (!player.fail) {
            player.fail = new Audio('/audio/fail.mp3');
            player.fail.volume = 1.0;
            player.fail.loop = false;
        }
        player.fail.currentTime = 0;
        player.fail.play();
    },
}

export default audioContext;