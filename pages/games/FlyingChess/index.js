// pages/games/FlyingChess/index.js
import cellData from './cellData'

let colorData = {
  yellow: '#f0e500',
  blue: '#036fea',
  red: '#ee211a',
  green: '#30a702',
}
let yellow = '#f0e500',blue = '#036fea',red = '#ee211a',green = '#30a702';

// 棋子属性
// color棋子的颜色 code是否走动一圈

Page({
    data: {
        cell_w: '',// 格子宽高
        cell_h: '',
        cell: null,// 格子数据
        home_w: '',// 棋子老家宽高
        home_h: '',
        // 老家棋子数据
        home_piece: {},
        in_site_piece: {// 在场上的棋子
          red: [],green: [],yellow: [],blue: []
        },
        sel_site_piece_key: 0,// 要选择移动棋子的key
        sel_piece_show: false,
        end_piece: {// 抵达终点玩家数量
            red: {},green: {},yellow: {},blue: {}
        },
        home_index: 0,// 当前摇骰子玩家
        red_start: 26,// 每个棋子的起始位置
        green_start: 10,
        blue_start: 158,
        yellow_start: 142,
        siteOrder: [// 棋子一圈的格子顺序
            3,4,5,6,7,8,9,22,35,48,49,50,51,64,77,90,103,116,129,128,127,126,139,152,165,164,163,162,161,160,159,146,133,120,119,118,117,104,91,78,65,52,39,40,41,42,29,16
        ],
        red_end: 78,// 每个棋子的终点起始位置
        green_end: 6,
        blue_end: 162,
        yellow_end: 90,
        pieceOrder: ['red','green','yellow','blue'],
        pieceOrderCn: ['红色','绿色','黄色','蓝色'],
        pieceLead: {// 当前玩家选择的棋子数据
            name: 'red',// 颜色
            index: 0,// index
            homeNo: '',// 还未出发棋子序号
        },
        dice: [1,2,3,4,5,6],// 骰子
        // dice_start: [2,4,6],// 出发的点数
        dice_start: [1,2,3,4,5,6],// 出发的点数
    },
    onLoad(options) {
        this.setData({
            cell: cellData
        })

        // 设置棋子初始数据
        let homePieceData = {};
        this.data.pieceOrder.forEach(val=>{
          homePieceData[val] = new Array(4);
          homePieceData[val] = homePieceData[val].fill(null).map((i,k)=>{
            return {
              color: colorData[val],
              no: k+1,
              cellIndex: 0
            }
          })
        })
        this.setData({
          home_piece: homePieceData
        })

    },
    onReady() {
        let _this = this;
        let query = wx.createSelectorQuery();
        // 根据设备大小设置格子大小
        query.select('#site').boundingClientRect(function(rect) {
            // 棋盘大小
            let w = rect.width, h = rect.height;
            // 格子大小
            let item_w = Math.floor(w / 13), item_h = Math.floor(h / 13);
            _this.setData({
                cell_w: item_w+'px',
                cell_h: item_h+'px',
                home_w: item_w*2+'px',
                home_h: item_h*2+'px'
            })
        }).exec();
    },
    onShow() {

    },
    onHide() {

    },
    onUnload() {

    },
    //用户点击右上角分享
    onShareAppMessage() {

    },
    /**
     * 摇骰子
     */
    getDice() {
        let i = Math.round(Math.random()*(5-0)+0)
        let num = this.data.dice[i]
        // console.log(num);
        this.movePiece(num)
    },
    /**
     * 移动棋子判断
     * @param {number} num 骰子点数
     */
    movePiece(num) {
        let pieceName = this.data.pieceOrder[this.data.home_index];// 当前要移动的棋子颜色名称en

        if (this.data.dice_start.indexOf(num) < 0) {
            // 不在出发规则里 轮到下一个玩家
            this.skipPlayer(false)
            return
        }
        
        let len = this.data.home_piece[pieceName].length;// 当前行动玩家老家棋子数量
        if (len < 4) {// 已有棋子出发
          
          if (pieceName == this.data.pieceLead.name) {// 主玩家需要选择棋子出发
            this.setData({
              sel_site_piece_key: 0
            })
            console.log(this.data.home_piece[pieceName],'----老家棋子');
            console.log(this.data.in_site_piece[pieceName],'====在场的棋子');
            if (this.data.home_piece[pieceName].length != 0) {// 老家还有棋子，拼接棋子序号
              let homeNo = '';
              this.data.home_piece[pieceName].forEach(val=>{
                homeNo += val.no + '、'
              })
              this.data.pieceLead.homeNo = homeNo.substr(0,homeNo.length-1);
              this.setData({
                pieceLead: this.data.pieceLead
              })
              this.setData({// 老家还有棋子默认选老家
                sel_site_piece_key: -1
              })
            }
            this.setData({
              sel_piece_show: true
            })

          } else {// 其他棋子
            // 调试直接跳过
            this.skipPlayer(false)
          }

        } else {// 没有棋子出发
          this.takeOffPiece(pieceName)
        }
    },
    /**
     * 不能出发或者前进完 到下一个玩家
     * @param {boolean} flag false=不能出发 true=前进完
     */
    skipPlayer(flag) {
        this.data.home_index++;// 行动中玩家下标
        this.setData({
            home_index: this.data.home_index > 3 ? 0 : this.data.home_index
        })
        if (!flag) {
            wx.showToast({title: '不能出发', icon: 'none', mask: true})
            setTimeout(()=>{
                wx.showToast({
                    title: '轮到'+this.data.pieceOrderCn[this.data.home_index]+'玩家',
                    icon: 'none', duration: 1000, mask: true
                })
                setTimeout(()=>{
                    if (this.data.home_index != this.data.pieceLead.index) {
                        this.getDice();
                    }
                },1000)
            },1500)
        } else {
            wx.showToast({
                title: '轮到'+this.data.pieceOrderCn[this.data.home_index]+'玩家',
                icon: 'none', duration: 1000, mask: true
            })
            setTimeout(()=>{
                if (this.data.home_index != this.data.pieceLead.index) {
                    this.getDice();
                }
            },1000)
        }
    },
    /**
     * 从老家出发的棋子
     * @param {string} pieceName 要出发棋子的颜色
     */
    takeOffPiece(pieceName) {
      let len = this.data.home_piece[pieceName].length;// 当前行动玩家老家棋子数量
      // 删除老家一个棋子
      let piece = this.data.home_piece[pieceName][len-1];
      this.data.home_piece[pieceName].pop();
      this.setData({
        home_piece: this.data.home_piece
      })
      // 往起始位置加一个棋子
      this.data.cell[this.data[pieceName+'_start']].pieces.push(piece)
      this.setData({
          cell: this.data.cell
      })
      // 记录在棋盘中的棋子
      this.data.in_site_piece[pieceName].push(piece);
      this.setData({
        in_site_piece: this.data.in_site_piece
      })

      this.skipPlayer(true)
    },
    /**
     * 移动棋盘中的棋子
     */
    setMovePiece() {

    },
    /**
     * 选择要移动的棋子key
     */
    selPiece(e) {
      // console.log(e);
      let key = e.detail.value;
      this.setData({
        sel_site_piece_key: key
      })
    },
    /**
     * 确定要移动的棋子
     */
    setSelPiece() {
      if (this.data.sel_site_piece_key < 0) {// 新出发
        this.takeOffPiece(this.data.pieceLead.name)
        this.setData({
          sel_piece_show: false
        })
      } else {// 当前要移动棋子的序号

      }
    },
})