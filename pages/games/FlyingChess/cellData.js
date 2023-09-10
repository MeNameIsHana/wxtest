/**
 * 初始化每个格子属性
 * backColor: 格子颜色
 * pieces：棋子数据
 * pieceJump: 可以飞跃的棋子
 * pieceJumpIndex: 飞向的index
 */
let cellData = new Array(169);
let yellow = '#f0e500',blue = '#036fea',red = '#ee211a',green = '#30a702';
let index = 0;
cellData.fill(null)
cellData = cellData.map((val,key)=>{
    // 黄色
    if (key==3||key==7||key==35||key==50||key==52||key==85||key==86||key==87||key==88||key==89||key==90||key==104||key==128||key==139||key==142||key==159||key==163) {
        return {
            key,
            degNum:'to right',
            backColor: [yellow,yellow],
            pieces: []
        }
    }
    // 蓝色
    if (key==4||key==8||key==39||key==51||key==91||key==97||key==103||key==110||key==119||key==123||key==127||key==136||key==146||key==149||key==152||key==158||key==162) {
        return {
            key,
            degNum:'to right',
            backColor: [blue,blue],
            pieces: []
        }
    }
    // 红色
    if (key==5||key==9||key==26||key==29||key==40||key==64||key==78||key==79||key==80||key==81||key==82||key==83||key==116||key==118||key==133||key==161||key==165) {
        return {
            key,
            degNum:'to right',
            backColor: [red,red],
            pieces: []
        }
    }
    // 绿色
    if (key==6||key==10||key==16||key==19||key==22||key==32||key==41||key==45||key==49||key==58||key==65||key==71||key==77||key==117||key==129||key==160||key==164) {
        return {
            key,
            degNum:'to right',
            backColor: [green,green],
            pieces: []
        }
    }
    // 黄蓝 蓝色跳跃
    if (key==42) {
        return {
            key,
            degNum: '45deg',
            backColor: [yellow,blue],
            pieces: [],
            pieceJump: 'blue',
            pieceJumpIndex: 48
        }
    }
    // 蓝红 红色跳跃
    if (key==48) {
        return {
            key,
            degNum: '-45deg',
            backColor: [red,blue],
            pieces: [],
            pieceJump: 'red',
            pieceJumpIndex: 126
        }
    }
    // 绿黄 黄色跳跃
    if (key==120) {
        return {
            key,
            degNum: '-45deg',
            backColor: [green,yellow],
            pieces: [],
            pieceJump: 'yellow',
            pieceJumpIndex: 42
        }
    }
    // 红绿 绿色跳跃
    if (key==126) {
        return {
            key,
            degNum: '45deg',
            backColor: [green,red],
            pieces: [],
            pieceJump: 'green',
            pieceJumpIndex: 120
        }
    }
})
// console.log(cellData);
export default cellData