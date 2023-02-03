<template>
    <div>
        <el-row class="tac">
            <el-col :span="store.menuWidth">
                <el-menu :background-color="store.menuOpenOrNot ? '#334256' : ''" :collapse="!store.menuOpenOrNot"
                    :collapse-transition="false" class="el-menu-vertical-demo"
                    :text-color="store.menuOpenOrNot ? '#fff' : ''" :default-active="store.nowSelectMenu"
                    style="height: 100%">
                    <el-menu-item disabled style="cursor: default;">
                        <img src="/src/assets/images/logo.png" style="width: 40px;margin-left: -8px;" />
                        <h3 v-show="store.menuOpenOrNot" style="margin-left: 4px;">{{ t('menu.name') }}</h3>
                    </el-menu-item>
                    <template v-for="item in store.menuItems">
                        <!-- 没有下级菜单 -->
                        <template v-if="!item.children">
                            <a @click="changCurrentCom('' + item.currentComName + '')">
                                <el-menu-item :index="item.id">
                                    <el-icon>
                                        <IconPark :type="item.iconName" strokeWidth="2" />
                                    </el-icon>
                                    <template #title>{{ t(item.title) }}</template>
                                </el-menu-item>
                            </a>
                        </template>
                        <template v-else>
                            <el-sub-menu :index="item.id">
                                <template #title>
                                    <el-icon>
                                        <IconPark :type="item.iconName" strokeWidth="2" />
                                    </el-icon>
                                    <span>{{ t(item.title) }}</span>
                                </template>
                                <a v-for="(item2, index2) in item.children" :key="index2"
                                    @click="changCurrentCom('' + item2.currentComName + '')">
                                    <el-menu-item :index="item2.id">
                                        <el-icon>
                                            <IconPark :type="item2.iconName" strokeWidth="2" />
                                        </el-icon>
                                        <template #title><span>{{ t(item2.title) }}</span></template>
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
                            <el-tooltip class="box-item" effect="dark" :content="t('main.openMenu')" placement="right">
                                <el-icon @click="store.openMenuOrNot" v-show="!store.menuOpenOrNot" style="float: left;"
                                    size="16" color="#57a1fd">
                                    <Expand style="cursor: pointer;" />
                                </el-icon>
                            </el-tooltip>
                            <el-tooltip class="box-item" effect="dark" :content="t('main.closeMenu')" placement="right">
                                <el-icon @click="store.openMenuOrNot" v-show="store.menuOpenOrNot" style="float: left;"
                                    size="16" color="#57a1fd">
                                    <Fold style="cursor: pointer;" />
                                </el-icon>
                            </el-tooltip>
                            <el-breadcrumb-item style="margin-left: 8px;"><strong style="cursor: pointer;"
                                    @click="changCurrentCom('index')">{{ t('menu.home') }}</strong></el-breadcrumb-item>
                            <el-breadcrumb-item v-for="item in currentBreadName">{{ t(item) }}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div>
                            <el-tooltip class="box-item" effect="dark" :content="t('main.full')" placement="left">
                                <IconPark v-show="!store.fullScreen" type="full-screen" size="17"
                                    @click="fullScreenOrNot()" style="color: grey;" />
                            </el-tooltip>
                            <el-tooltip class="box-item" effect="dark" :content="t('main.noFull')" placement="left">
                                <IconPark v-show="store.fullScreen" type="off-screen" size="17"
                                    @click="fullScreenOrNot()" style="color: grey;" />
                            </el-tooltip>
                            <el-dropdown style="margin: 0px 15px;">
                                <span class="el-dropdown-link" style="color: grey;">
                                    <IconPark type="translate" size="18" />
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item :disabled="store.i18nIsChinese" @click="change('zh')">
                                            中文
                                        </el-dropdown-item>
                                        <el-dropdown-item :disabled="!store.i18nIsChinese" @click="change('en')">
                                            English
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-dropdown>
                                <span class="el-dropdown-link" style="color: grey;">
                                    <IconPark type="config" size="18" />
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="modifyDialogVisible = true">
                                            <el-icon>
                                                <EditPen />
                                            </el-icon>
                                            {{ t('main.modifyPassword') }}
                                        </el-dropdown-item>
                                        <el-dropdown-item @click="logout">
                                            <el-icon>
                                                <SwitchButton />
                                            </el-icon>
                                            {{ t('main.logout') }}
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
                                    t(item.name)
                                }}</el-tag>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :icon="Top" @click="closeAll()">{{
                                t('main.closeAll')
                            }}</el-dropdown-item>
                            <el-dropdown-item :icon="Back" @click="closeLeft(index)">{{
                                t('main.closeLeft')
                            }}</el-dropdown-item>
                            <el-dropdown-item :icon="Right" @click="closeRight(index)">{{
                                t('main.closeRight')
                            }}</el-dropdown-item>
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
import { ref, shallowRef, getCurrentInstance } from "vue";
import { IconPark } from '@icon-park/vue-next/es/all';
import {
    SwitchButton,
    EditPen,
    Expand,
    Fold,
    Back,
    Right,
    Top,
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
import screenfull from "screenfull"
import { useI18n } from 'vue-i18n'//要在js中使用国际化

const { proxy } = getCurrentInstance();
// 改变语言
function change(type) {
    // 设置语言
    proxy.$i18n.locale = type;
    // 当前是中文
    if (type === 'zh') {
        store.i18nIsChinese = true;
    } else {
        store.i18nIsChinese = false;
    }
}
const { t } = useI18n()

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
        currentBreadName.value = ["menu.userManage"];
        currentCom.value = userManage;
        store.nowSelectMenu = '2';
    }
    if (currentComName === "announcementManage") {
        currentBreadName.value = ["menu.announcementManage"];
        currentCom.value = announcementManage;
        store.nowSelectMenu = '3';
    }
    if (currentComName === "bigTypeManage") {
        currentBreadName.value = ["menu.typeManage", "menu.bigTypeManage"];
        currentCom.value = bigTypeManage;
        store.nowSelectMenu = '4-1';
    }
    if (currentComName === "smallTypeManage") {
        currentBreadName.value = ["menu.typeManage", "menu.smallTypeManage"];
        currentCom.value = smallTypeManage;
        store.nowSelectMenu = '4-2';
    }
    if (currentComName === "goodsManage") {
        currentBreadName.value = ["menu.goodsManage"];
        currentCom.value = goodsManage;
        store.nowSelectMenu = '5';
    }
    if (currentComName === "orderManage") {
        currentBreadName.value = ["menu.orderManage"];
        currentCom.value = orderManage;
        store.nowSelectMenu = '6';
    }
    if (currentComName === "valuationManage") {
        currentBreadName.value = ["menu.valuationManage"];
        currentCom.value = valuationManage;
        store.nowSelectMenu = '7';
    }
    if (currentComName !== "index") {
        store2.addTab(currentBreadName.value[currentBreadName.value.length - 1], true, currentComName)
    } else {
        store2.addTab('menu.home', true, currentComName)
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
        name: 'menu.home',
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

const fullScreenOrNot = () => {
    screenfull.toggle();
    setTimeout(() => {
        store.fullScreen = screenfull.isFullscreen
    }, 100);
}
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