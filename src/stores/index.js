import { defineStore } from "pinia"

export const useMenuStore = defineStore('main', {
    state: () => {
        return {
            // 垂直菜单默认打开
            menuOpenOrNot: true,
            menuWidth: 4,
            nowSelectMenu: '3-1',
            fullScreen: false,
            i18nIsChinese: true,
            // 菜单数组
            menuItems: [
                {
                    id: '1',
                    iconName: 'home',
                    currentComName: 'index',
                    title: 'menu.home'
                },
                {
                    id: '2',
                    iconName: 'avatar',
                    currentComName: 'userManage',
                    title: 'menu.userManage'
                },
                {
                    id: '3',
                    iconName: "announcement",
                    currentComName: 'announcementManage',
                    title: 'menu.announcementManage'
                },
                {
                    id: '4',
                    iconName: 'bookmark',
                    title: 'menu.typeManage',
                    children: [
                        {
                            id: '4-1',
                            iconName: 'bookmark-one',
                            currentComName: 'bigTypeManage',
                            title: 'menu.bigTypeManage'
                        },
                        {
                            id: '4-2',
                            iconName: 'bookmark-one',
                            currentComName: 'smallTypeManage',
                            title: 'menu.smallTypeManage'
                        }
                    ]
                },
                {
                    id: '5',
                    iconName: 'commodity',
                    currentComName: 'goodsManage',
                    title: 'menu.goodsManage'
                },
                {
                    id: '6',
                    iconName: 'order',
                    currentComName: 'orderManage',
                    title: 'menu.orderManage'
                },
                {
                    id: '7',
                    iconName: 'star',
                    currentComName: 'valuationManage',
                    title: 'menu.valuationManage'
                }
            ]
        }
    },
    actions: {
        // 打开菜单与否
        openMenuOrNot() {
            this.menuOpenOrNot = !this.menuOpenOrNot
            this.menuOpenOrNot ? this.menuWidth = 4 : this.menuWidth = 1
        }
    },
    persist: {
        key: 'useMenuStore',
        storage: localStorage,
        paths: ['menuOpenOrNot', 'menuWidth', 'nowSelectMenu']
    }
})

export const useTabStore = defineStore('useTabStore', {
    state: () => {
        return {
            removeSelectTab: false,
            tabs: [
                {
                    name: 'menu.home',
                    selectOrNot: true,
                    currentComName: 'index'
                }
            ]
        }
    },
    actions: {
        // 打开标签页
        addTab(name, selectOrNot, currentComName) {
            // 用于判断标签是否已经存在
            let flag = false;
            for (let i = 0; i < this.tabs.length; i++) {
                const element = this.tabs[i];
                if (element.name === name) {
                    flag = true;
                }
                // 是选中状态时
                if (element.selectOrNot) {
                    // 设置为未选中
                    element.selectOrNot = false;
                } else {
                    continue;
                }
            }
            // 标签不存在时
            if (!flag) {
                // 要添加的标签对象
                const tab = {
                    name: name,
                    selectOrNot: selectOrNot,
                    currentComName: currentComName
                }
                // 添加
                this.tabs.push(tab);
            } else {
                for (let i = 0; i < this.tabs.length; i++) {
                    const element = this.tabs[i];
                    // 将已存在的标签设置为选中
                    if (element.name === name) {
                        element.selectOrNot = true;
                    }
                }
            }
        },
        // 关闭标签页
        removeTab(name) {
            for (let i = 0; i < this.tabs.length; i++) {
                const element = this.tabs[i];
                if (element.name === name) {
                    element.selectOrNot ? this.removeSelectTab = true : this.removeSelectTab = false;
                    this.tabs.splice(i, 1);
                }

            }
            // 全部标签页都关完的话,保留一个首页的标签页
            if (this.tabs.length === 0) {
                // 要添加的标签对象
                const tab = {
                    name: 'menu.home',
                    selectOrNot: true,
                    currentComName: 'index'
                }
                // 添加
                this.tabs.push(tab);
            }
        }
    },
    persist: {
        key: 'useTabStore',
        storage: localStorage,
        paths: ['tabs']
    }
})