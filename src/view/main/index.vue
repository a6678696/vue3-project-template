<template>
    <div>
        <el-row class="tac">
            <el-col :span="store.menuWidth">
                <el-menu background-color="#334256" :collapse="!store.menuOpenOrNot" :collapse-transition="false"
                    class="el-menu-vertical-demo el-menu" text-color="#fff" :default-active="store.nowSelectMenu"
                    style="height: 100%">
                    <el-menu-item disabled style="cursor: default;">
                        <img src="/src/assets/images/logo.png" style="width: 40px;margin-left: -8px;" />
                        <h3 v-show="store.menuOpenOrNot" style="margin-left: 4px;">后台管理系统模板</h3>
                    </el-menu-item>
                    <template v-for="item in store.menuItems">
                        <template v-if="!item.children">
                            <a @click="changCurrentCom('' + item.currentComName + '')">
                                <el-menu-item :index="item.id">
                                    <el-icon>
                                        <User v-show="item.iconName === 'User'" />
                                        <Bell v-show="item.iconName === 'Bell'" />
                                        <Tickets v-show="item.iconName === 'Tickets'" />
                                        <Goods v-show="item.iconName === 'Goods'" />
                                        <CollectionTag v-show="item.iconName === 'CollectionTag'" />
                                        <ChatDotRound v-show="item.iconName === 'ChatDotRound'" />
                                        <House v-show="item.iconName === 'House'" />
                                    </el-icon>
                                    <template #title>{{ item.title }}</template>
                                </el-menu-item>
                            </a>
                        </template>
                        <template v-else>
                            <el-sub-menu :index="item.id">
                                <template #title>
                                    <el-icon>
                                        <User v-show="item.iconName === 'User'" />
                                        <Bell v-show="item.iconName === 'Bell'" />
                                        <Tickets v-show="item.iconName === 'Tickets'" />
                                        <Goods v-show="item.iconName === 'Goods'" />
                                        <CollectionTag v-show="item.iconName === 'CollectionTag'" />
                                        <ChatDotRound v-show="item.iconName === 'ChatDotRound'" />
                                        <House v-show="item.iconName === 'House'" />
                                    </el-icon>
                                    <span>{{ item.title }}</span>
                                </template>
                                <a v-for="(item2, index2) in item.children" :key="index2"
                                    @click="changCurrentCom('' + item2.currentComName + '')">
                                    <el-menu-item :index="item2.id">
                                        <el-icon>
                                            <DocumentRemove v-show="item2.iconName === 'DocumentRemove'" />
                                        </el-icon>
                                        <template #title><span>{{ item2.title }}</span></template>
                                    </el-menu-item>
                                </a>
                            </el-sub-menu>
                        </template>
                    </template>
                </el-menu>
            </el-col>
            <el-col :span="24 - store.menuWidth">
                <el-card class="box-card">
                    <div class="card-header">
                        <el-breadcrumb>
                            <el-tooltip class="box-item" effect="dark" content="展开菜单" placement="right">
                                <el-icon @click="store.openMenuOrNot" v-show="!store.menuOpenOrNot" style="float: left;"
                                    size="16" color="#57a1fd">
                                    <Expand style="cursor: pointer;" />
                                </el-icon>
                            </el-tooltip>
                            <el-tooltip class="box-item" effect="dark" content="收起菜单" placement="right">
                                <el-icon @click="store.openMenuOrNot" v-show="store.menuOpenOrNot" style="float: left;"
                                    size="16" color="#57a1fd">
                                    <Fold style="cursor: pointer;" />
                                </el-icon>
                            </el-tooltip>
                            <el-breadcrumb-item style="margin-left: 8px;"><strong style="cursor: pointer;"
                                    @click="changCurrentCom('index')">首页</strong></el-breadcrumb-item>
                            <el-breadcrumb-item v-for="item in currentBreadName">{{ item }}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    <el-icon class="is-loading" size="16">
                                        <Setting />
                                    </el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="modifyDialogVisible = true">
                                            <el-icon>
                                                <EditPen />
                                            </el-icon>
                                            修改密码
                                        </el-dropdown-item>
                                        <el-dropdown-item @click="logout">
                                            <el-icon>
                                                <SwitchButton />
                                            </el-icon>
                                            注销
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                </el-card>
                <span style="margin-left: 11px;" v-show="!store.menuOpenOrNot"></span>
                <el-dropdown trigger="contextmenu" v-for="(item, index) in store2.tabs">
                    <span class="el-dropdown-link">
                        <el-tag @click="changCurrentCom('' + item.currentComName + '')" size="default"
                            style="cursor: pointer;" :effect="item.selectOrNot ? 'dark' : 'plain'" closable
                            class="el-tag-margin" @close="store2.removeTab('' + item.name + ''), openFirstTab()"><span
                                v-show="item.selectOrNot">✿</span> {{
                                    item.name
                                }}</el-tag>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :icon="Top" @click="closeAll()">关闭全部</el-dropdown-item>
                            <el-dropdown-item :icon="Back" @click="closeLeft(index)">关闭左侧</el-dropdown-item>
                            <el-dropdown-item :icon="Right" @click="closeRight(index)">关闭右侧</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-card class="box-card">
                    <component :is="currentCom"></component>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref, shallowRef } from "vue";
import {
    Bell,
    User,
    Tickets,
    DocumentRemove,
    Goods,
    SwitchButton,
    CollectionTag,
    EditPen,
    ChatDotRound,
    Expand,
    Fold,
    Setting,
    Back,
    Right,
    Top,
    House
} from "@element-plus/icons-vue";
import axiosUtil from '@/util/axios';
import router from "@/router";
import { useMenuStore, useTabStore } from "@/stores/index";
// 导入可以打开的标签页
import index from '@/view/index/index.vue'
import userManage from '@/view/userManage/index.vue'
import announcementManage from '@/view/announcementManage/index.vue'
import bigTypeManage from '@/view/bigTypeManage/index.vue'
import smallTypeManage from '@/view/smallTypeManage/index.vue'
import goodsManage from '@/view/goodsManage/index.vue'
import orderManage from '@/view/orderManage/index.vue'
import valuationManage from '@/view/valuationManage/index.vue'

const store = useMenuStore();
const store2 = useTabStore();
// 正在打开的页面
const currentCom = shallowRef(index);
// 正在打开的页面名称
const currentBreadName = ref();

//切换页面
const changCurrentCom = (currentComName) => {
    if (currentComName === "index") {
        currentBreadName.value = [];
        currentCom.value = index;
        store.nowSelectMenu = '1';
    }
    if (currentComName === "userManage") {
        currentBreadName.value = ["用户管理"];
        currentCom.value = userManage;
        store.nowSelectMenu = '2';
    }
    if (currentComName === "announcementManage") {
        currentBreadName.value = ["公告管理"];
        currentCom.value = announcementManage;
        store.nowSelectMenu = '3';
    }
    if (currentComName === "bigTypeManage") {
        currentBreadName.value = ["商品分类管理", "商品大类"];
        currentCom.value = bigTypeManage;
        store.nowSelectMenu = '4-1';
    }
    if (currentComName === "smallTypeManage") {
        currentBreadName.value = ["商品分类管理", "商品小类"];
        currentCom.value = smallTypeManage;
        store.nowSelectMenu = '4-2';
    }
    if (currentComName === "goodsManage") {
        currentBreadName.value = ["商品管理"];
        currentCom.value = goodsManage;
        store.nowSelectMenu = '5';
    }
    if (currentComName === "orderManage") {
        currentBreadName.value = ["订单管理"];
        currentCom.value = orderManage;
        store.nowSelectMenu = '6';
    }
    if (currentComName === "valuationManage") {
        currentBreadName.value = ["评价管理"];
        currentCom.value = valuationManage;
        store.nowSelectMenu = '7';
    }
    if (currentComName !== "index") {
        store2.addTab(currentBreadName.value[currentBreadName.value.length - 1], true, currentComName)
    } else {
        store2.addTab('首页', true, currentComName)
    }
}

//注销登录
const logout = () => {
    ElMessageBox
        .confirm(
            '你确定要注销登录吗?',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        .then(() => {
            window.sessionStorage.clear();
            router.replace('/');
        })
        .catch(() => {
        })
}

// 关闭正在打开的标签页时打开第一个标签页
const openFirstTab = () => {
    if (store2.removeSelectTab) {
        changCurrentCom(store2.tabs[0].currentComName)
    }
}

// 关闭左侧
const closeLeft = (index) => {
    // 如果是第一个标签页,方法不往下执行,因为左侧没有要关闭的标签页
    if (index === 0) {
        return false;
    }
    // 用于标记是否关闭了已选中的标签页
    let flag = false;
    for (let i = 0; i < index; i++) {
        const element = store2.tabs[i];
        // 关闭的标签页中有一个是选中的
        if (element.selectOrNot) {
            flag = true;
            break;
        }
    }
    store2.tabs.splice(0, index);
    if (flag) {
        // 打开第一个标签页
        changCurrentCom(store2.tabs[0].currentComName)
    }
}

// 关闭左侧
const closeRight = (index) => {
    // 如果是最后一个标签页,方法不往下执行,因为右侧没有要关闭的标签页
    if (index === store2.tabs.length - 1) {
        return false;
    }
    // 用于标记是否关闭了已选中的标签页
    let flag = false;
    for (let i = index + 1; i < store2.tabs.length; i++) {
        const element = store2.tabs[i];
        // 关闭的标签页中有一个是选中的
        if (element.selectOrNot) {
            flag = true;
            break;
        }
    }
    store2.tabs.splice(index + 1, store2.tabs.length - index - 1);
    if (flag) {
        // 打开第一个标签页
        changCurrentCom(store2.tabs[0].currentComName)
    }
}

// 关闭全部
const closeAll = () => {
    store2.tabs.splice(0, store2.tabs.length);
    // 要添加的标签对象
    const tab = {
        name: '首页',
        selectOrNot: true,
        currentComName: 'index'
    }
    // 添加
    store2.tabs.push(tab);
    // 打开第一个标签页
    changCurrentCom(store2.tabs[0].currentComName)
}

// 打开上次选中的标签页
const openSelectTab = () => {
    for (let i = 0; i < store2.tabs.length; i++) {
        const element = store2.tabs[i];
        if (element.selectOrNot) {
            changCurrentCom(store2.tabs[i].currentComName);
            break;
        }
    }
}
openSelectTab();
</script>

<style scoped>
.el-menu {
    height: 97vh
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 300px;
}

.el-tag-margin {
    margin: 2px 1px;
}
</style>