import { defineStore } from "pinia"

export const useMenuStore = defineStore('useMenuStore', {
    state: () => {
        return {
            nowSelectMenu: '3-1',
            // 菜单数组
            menuItems: [
                {
                    id: '1',
                    iconName: 'home',
                    currentComName: 'index',
                    title: '首页'
                },
                {
                    id: '2',
                    iconName: 'avatar',
                    currentComName: 'userManage',
                    title: '用户管理'
                },
                {
                    id: '3',
                    iconName: "announcement",
                    currentComName: 'announcementManage',
                    title: '公告管理'
                },
                {
                    id: '4',
                    iconName: 'bookmark',
                    title: '商品分类管理',
                    children: [
                        {
                            id: '4-1',
                            iconName: 'bookmark-one',
                            currentComName: 'bigTypeManage',
                            title: '商品大类'
                        },
                        {
                            id: '4-2',
                            iconName: 'bookmark-one',
                            currentComName: 'smallTypeManage',
                            title: '商品小类'
                        }
                    ]
                },
                {
                    id: '5',
                    iconName: 'commodity',
                    currentComName: 'goodsManage',
                    title: '商品管理'
                },
                {
                    id: '6',
                    iconName: 'order',
                    currentComName: 'orderManage',  
                    title: '订单管理'
                },
                {
                    id: '7',
                    iconName: 'star',
                    currentComName: 'valuationManage',
                    title: '评价管理'
                }
            ]
        }
    },
    persist: {
        key: 'useMenuStore',
        storage: localStorage,
        paths: ['nowSelectMenu']
    }
})