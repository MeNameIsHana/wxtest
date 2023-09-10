// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        list:[
            {
                title: '简易飞行棋',
                url: '/pages/games/FlyingChess/index'
            },
        ]
    },
    onLoad() {

    },
    toPage(e) {
        let i = e.currentTarget.dataset.i;
        wx.navigateTo({
            url: i.url
        })
    },
   
   
})
