<template>
    <div style="overflow-x: hidden">
        <!-- 主体内容 -->
        <el-row :gutter="3">
            <!-- 左侧菜单 -->
            <el-col :span="4">
                <el-menu background-color="#334256" class="el-menu-vertical-demo" text-color="#fff"
                    :default-active="store.nowSelectMenu" style="height: 100%;border-right:none">
                    <template v-for="item in store.menuItems">
                        <!-- 没有下级菜单 -->
                        <template v-if="!item.children">
                            <el-menu-item :index="item.id" @click="changCurrentCom('' + item.currentComName + '')">
                                <el-icon>
                                    <IconPark :type="item.iconName" strokeWidth="2" />
                                </el-icon>
                                <template #title>{{ item.title }}</template>
                            </el-menu-item>
                        </template>
                        <template v-else>
                            <el-sub-menu :index="item.id">
                                <template #title>
                                    <el-icon>
                                        <IconPark :type="item.iconName" strokeWidth="2" />
                                    </el-icon>
                                    <span>{{ item.title }}</span>
                                </template>
                                <el-menu-item v-for="(item2, index2) in item.children" :key="index2" :index="item2.id"
                                    @click="changCurrentCom('' + item2.currentComName + '')">
                                    <el-icon>
                                        <IconPark :type="item2.iconName" strokeWidth="2" />
                                    </el-icon>
                                    <template #title><span>{{ item2.title }}</span></template>
                                </el-menu-item>
                            </el-sub-menu>
                        </template>
                    </template>
                </el-menu>
            </el-col>
            <!-- 右侧内容 -->
            <el-col :span="20">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <!-- 面包屑 -->
                            <el-breadcrumb>
                                <!-- 首页面包屑 -->
                                <el-breadcrumb-item>
                                    <strong style="cursor: pointer;" @click="changCurrentCom('index')">首页</strong>
                                </el-breadcrumb-item>
                                <!-- 菜单名称面包屑 -->
                                <el-breadcrumb-item v-for="item in currentBreadName">{{ item }}</el-breadcrumb-item>
                            </el-breadcrumb>
                            <div>
                                <!-- 设置 -->
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
import { ref, shallowRef, getCurrentInstance } from "vue";
import { IconPark } from '@icon-park/vue-next/es/all';
import {
    SwitchButton,
    EditPen,
} from "@element-plus/icons-vue";
import axiosUtil from '@/util/axios';
import router from "@/router";
import { useMenuStore } from "@/stores/index";
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
// 正在打开的页面
const currentCom = shallowRef(index);
// 正在打开的页面名称
const currentBreadName = ref('');

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
}

//注销登录
const logout = () => {
    ElMessageBox
        .confirm(
            '你确定要退出登录吗?',
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

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 300px;
}
</style>