<template>
    <div>
        <el-row class="tac">
            <el-col :span="menuWidth">
                <el-menu background-color="#334256" :collapse="store.menuOpenOrNot" class="el-menu-vertical-demo"
                    text-color="#fff" default-active="1" style="height: 100%">
                    <el-menu-item disabled style="cursor: default;">
                        <img src="/src/assets/images/logo.png" style="width: 40px;margin-left: -8px;" />
                        <h3 v-show="!store.menuOpenOrNot" style="margin-left: 4px;">后台管理系统模板</h3>
                    </el-menu-item>
                    <template v-for="(item, index) in store.menuItems" :key="index">
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
            <el-col :span="24 - menuWidth">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <el-breadcrumb>
                                <el-tooltip class="box-item" effect="dark" content="展开菜单" placement="right">
                                    <el-icon @click="expandMenuOrNot" v-show="store.menuOpenOrNot" style="float: left;"
                                        size="16" color="#57a1fd">
                                        <Expand style="cursor: pointer;" />
                                    </el-icon>
                                </el-tooltip>
                                <el-tooltip class="box-item" effect="dark" content="收起菜单" placement="right">
                                    <el-icon @click="expandMenuOrNot" v-show="!store.menuOpenOrNot" style="float: left;"
                                        size="16" color="#57a1fd">
                                        <Fold style="cursor: pointer;" />
                                    </el-icon>
                                </el-tooltip>
                                <el-breadcrumb-item style="margin-left: 8px;"><strong>首页</strong></el-breadcrumb-item>
                                <el-breadcrumb-item>{{ currentBreadName }}</el-breadcrumb-item>
                            </el-breadcrumb>
                            <div>
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <el-avatar :size="28" src="https://image.zoutl.cn/hexo-blog/images/logo.png" />
                                        <el-icon class="el-icon--right">
                                            <CaretBottom />
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
                    </template>
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
    CaretBottom,
    EditPen,
    ChatDotRound,
    Expand,
    Fold
} from "@element-plus/icons-vue";
import userManage from '@/view/userManage/index.vue'
import axiosUtil from '@/util/axios';
import { useMenuStore } from "@/stores/index";
import router from "@/router";

const store = useMenuStore();
const currentCom = shallowRef(userManage);
const currentBreadName = ref('用户管理');
//切换页面
const changCurrentCom = (currentComName) => {
    if (currentComName === "announcementManage") {
        currentBreadName.value = "公告管理";
    }
    if (currentComName === "userManage") {
        currentBreadName.value = "用户管理";
    }
    if (currentComName === "bigTypeManage") {
        currentBreadName.value = "商品分类管理 / 商品大类";
    }
    if (currentComName === "smallTypeManage") {
        currentBreadName.value = "商品分类管理 / 商品小类";
    }
    if (currentComName === "goodsManage") {
        currentBreadName.value = "商品管理";
    }
    if (currentComName === "orderManage") {
        currentBreadName.value = "订单管理";
    }
    if (currentComName === "valuationManage") {
        currentBreadName.value = "评价管理";
    }
}
const menuWidth = ref(4)
const checkMenuOpenOrNot = () => {
    store.menuOpenOrNot ? menuWidth.value = 1 : menuWidth.value = 4
}
checkMenuOpenOrNot()
const expandMenuOrNot = () => {
    store.menuOpenOrNot = !store.menuOpenOrNot
    if (store.menuOpenOrNot) {
        menuWidth.value = 1
    } else {
        menuWidth.value = 4
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
    width: 213px;
    /* width: 100%; */
    min-height: 400px;
}
</style>