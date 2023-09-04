// 下方时间你可以根据你的网络情况酌情调整
const submitDelayBase = 3000;       // Submit 之后的等待时间
const pageNextDelayBase = 5000;     // 换页 之后的等待时间
const inputDelayBase = 500;         // 输入 之后的等待时间

// 随机 Submit 之后的等待时间
function submitDelay(MAX = submitDelayBase + 1000, MIN = submitDelayBase - 1000) {
    return Math.floor(Math.random() * (MAX - MIN) + MIN)
}
// 随机 换页 之后的等待时间
function pageNextDelay(MAX = pageNextDelayBase + 1000, MIN = pageNextDelayBase -1000) {
    return Math.floor(Math.random() * (MAX - MIN) + MIN)
}
// 随机 之后的等待时间
function inputDelay(MAX = inputDelayBase + 100, MIN = inputDelayBase -100) {
    return Math.floor(Math.random() * (MAX - MIN) + MIN)
}

const allauto = ['auto_tiankong', 'auto_luyin', 'auto_lytk', 'auto_roleplay', 'auto_danxuan', 'auto_dropchoose', 'auto_drag', 'auto_video', 'auto_duoxuan'];
let user_config = {
    'autodo': allauto,
    'autotryerr': true,
    'autostop': false,
    'autorecord': true,
    'redo': false,
    'delay': 10000,
    'loop': 1
};

export {submitDelay, pageNextDelay, inputDelay, allauto, user_config}