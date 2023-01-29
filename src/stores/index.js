import { defineStore } from "pinia"

export const useMenuStore = defineStore('main', {
    state: () => {
        return {
            // 垂直菜单默认不折叠
            menuOpenOrNot: false,
            // 菜单数组
            menuItems: [
                {
                    id: '1',
                    iconName: 'User',
                    currentComName: 'userManage',
                    title: '用户管理'
                },
                {
                    id: '2',
                    iconName: "Bell",
                    currentComName: 'announcementManage',
                    title: '公告管理'
                },
                {
                    id: '3',
                    iconName: 'Tickets',
                    title: '商品分类管理',
                    children: [
                        {
                            id: '3-1',
                            iconName: 'DocumentRemove',
                            currentComName: 'bigTypeManage',
                            title: '商品大类'
                        },
                        {
                            id: '3-2',
                            iconName: 'DocumentRemove',
                            currentComName: 'smallTypeManage',
                            title: '商品小类'
                        }
                    ]
                },
                {
                    id: '4',
                    iconName: 'Goods',
                    currentComName: 'goodsManage',
                    title: '商品管理'
                },
                {
                    id: '5',
                    iconName: 'CollectionTag',
                    currentComName: 'orderManage',
                    title: '订单管理'
                },
                {
                    id: '6',
                    iconName: 'ChatDotRound',
                    currentComName: 'valuationManage',
                    title: '评价管理'
                }
            ]
        }
    },
    persist: {
        key: 'useMenuStore',
        storage: localStorage,
        paths: ['menuOpenOrNot']
    }
})