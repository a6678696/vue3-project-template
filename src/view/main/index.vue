<template>
    <div style="overflow-x: hidden;margin-top: 3px;">
        <!-- 主体内容 -->
        <el-row :gutter="3">
            <!-- 左侧菜单 -->
            <el-col :span="4">
                <el-menu background-color="#334256" class="el-menu-vertical-demo" text-color="#fff" default-active="1"
                    style="height: 100%;border-right:none;" unique-opened="true" active-text-color="white">
                    <template v-for="item in store.menuItems">
                        <!-- 没有下级菜单 -->
                        <template v-if="!item.children">
                            <el-menu-item :index="item.id" @click="openCurrentCom('' + item.currentComName + '')">
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
                                    @click="openCurrentCom('' + item2.currentComName + '')">
                                    <el-icon>
                                        <IconPark :type="item2.iconName" strokeWidth="2" />
                                    </el-icon>
                                    <template #title><span>{{ item2.title }}</span></template>
                                </el-menu-item>
                            </el-sub-menu>
                        </template>
                    </template>
                    <el-menu-item @click="logout">
                        <el-icon>
                            <IconPark type="logout" strokeWidth="2" />
                        </el-icon>
                        <template #title>退出登录</template>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <!-- 右侧内容 -->
            <el-col :span="20">
                <el-tabs v-model="editableTabsValue" type="border-card" closable @tab-remove="removeTab">
                    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                        <!-- 右键菜单开始：自定义标签页显示名称，保证每个标签页都能实现右键菜单 -->
                        <template #label>
                            <el-dropdown trigger="contextmenu">
                                <span style="margin-top: 11px;" v-if="editableTabsValue !== item.name">
                                    <span>{{ item.title }}</span>
                                </span>
                                <strong style="margin-top: 11px;">
                                    <span :style="editableTabsValue === item.name ? 'color:#bd14e7' : ''">{{ item.title
                                    }}</span>
                                </strong>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item :icon="Refresh"
                                            @click="refreshNowTab(item.name)">刷新标签页</el-dropdown-item>
                                        <el-dropdown-item :icon="Close"
                                            @click="removeNowTab(item.name)">关闭标签页</el-dropdown-item>
                                        <el-dropdown-item :icon="DArrowLeft"
                                            @click="removeLeftTab(item.name)">关闭左侧标签页</el-dropdown-item>
                                        <el-dropdown-item :icon="DArrowRight"
                                            @click="removeRightTab(item.name)">关闭右侧标签页</el-dropdown-item>
                                        <el-dropdown-item :icon="Operation"
                                            @click="removeOtherTab(item.name)">关闭其他标签页</el-dropdown-item>
                                        <el-dropdown-item :icon="Minus" @click="removeAllTab()">关闭全部标签页</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </template>
                        <!-- 右键菜单结束 -->
                        <component :is="item.content"></component>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { IconPark } from '@icon-park/vue-next/es/all';
import { Close, DArrowLeft, DArrowRight, Operation, Minus, Refresh } from "@element-plus/icons-vue"
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

//打开页面
const openCurrentCom = (currentComName) => {
    if (currentComName === "index") {
        addTab('首页', '1', index)
    }
    if (currentComName === "userManage") {
        addTab('用户管理', '2', userManage)
    }
    if (currentComName === "announcementManage") {
        addTab('公告管理', '3', announcementManage)
    }
    if (currentComName === "bigTypeManage") {
        addTab('商品大类', '4', bigTypeManage)
    }
    if (currentComName === "smallTypeManage") {
        addTab('商品小类', '5', smallTypeManage)
    }
    if (currentComName === "goodsManage") {
        addTab('商品管理', '6', goodsManage)
    }
    if (currentComName === "orderManage") {
        addTab('订单管理', '7', orderManage)
    }
    if (currentComName === "valuationManage") {
        addTab('评价管理', '8', valuationManage)
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

// 表单文本宽度
const formLabelWidth = '80px'

const editableTabsValue = ref('1')
const editableTabs = ref([
    {
        title: '首页',
        name: '1',
        content: index,
    }
])
// 增加标签页
const addTab = (title, name, content) => {
    for (let i = 0; i < editableTabs.value.length; i++) {
        const element = editableTabs.value[i];
        if (element.title === title) {
            editableTabsValue.value = name
            return false
        }
    }
    editableTabs.value.push({
        title: title,
        name: name,
        content: content,
    })
    editableTabsValue.value = name
}
// 关闭标签页
const removeTab = (targetName) => {
    for (let i = 0; i < editableTabs.value.length; i++) {
        const element = editableTabs.value[i];
        if (element.name === targetName.toString()) {
            // 如果删除的是当前页,就重新设置一个当前页
            if (element.name === editableTabsValue.value) {
                // 如果不是只有一页
                if (editableTabs.value.length > 1) {
                    // 如果是第一页,就设置下一页为当前页
                    if (i === 0) {
                        editableTabsValue.value = editableTabs.value[i + 1].name
                    } else {// 否则就设置上一页为当前页
                        editableTabsValue.value = editableTabs.value[i - 1].name
                    }
                } else {//只有1页时
                    // 当前页是首页就不能删除
                    if (element.title === '首页') {
                        ElMessage.error('只有1页且是首页时不能删除')
                        break
                    }
                }
            }
            editableTabs.value.splice(i, 1)
            // 全部标签页都没了自动加一个首页的标签页
            if (editableTabs.value.length === 0) {
                addTab('首页', '1', index)
            }
        }
    }
}
// 刷新当前标签页
const refreshNowTab = (name) => {
    for (let i = 0; i < editableTabs.value.length; i++) {
        if (editableTabs.value[i].name === name) {
            editableTabs.value[i].content = null
            setTimeout(function () {
                if (name === '1') {
                    editableTabs.value[i].content = index
                }
                if (name === '2') {
                    editableTabs.value[i].content = userManage
                }
                if (name === '3') {
                    editableTabs.value[i].content = announcementManage
                }
                if (name === '4') {
                    editableTabs.value[i].content = bigTypeManage
                }
                if (name === '5') {
                    editableTabs.value[i].content = smallTypeManage
                }
                if (name === '6') {
                    editableTabs.value[i].content = goodsManage
                }
                if (name === '7') {
                    editableTabs.value[i].content = orderManage
                }
                if (name === '8') {
                    editableTabs.value[i].content = valuationManage
                }
            }, 100);
            break
        }
    }
}
// 关闭当前标签页
const removeNowTab = (name) => {
    for (let i = 0; i < editableTabs.value.length; i++) {
        if (editableTabs.value[i].name === name) {
            removeTab(name)
        }
    }
}
// 左侧当前标签页
const removeLeftTab = (name) => {
    for (let i = 0; i < editableTabs.value.length; i++) {
        if (editableTabs.value[i].name === name) {
            break
        } else {
            removeTab(editableTabs.value[i].name)
            i--
        }
    }
}
// 关闭右侧标签页
const removeRightTab = (name) => {
    // 用于标记右边的标签页是否要删除
    let flag = false
    for (let i = 0; i < editableTabs.value.length; i++) {
        if (editableTabs.value[i].name === name) {
            flag = true
        } else {
            if (flag) {
                removeTab(editableTabs.value[i].name)
                i--
            }
        }
    }
}
// 关闭其它标签页
const removeOtherTab = (name) => {
    for (let i = 0; i < editableTabs.value.length; i++) {
        if (editableTabs.value[i].name === name) {
            if (editableTabs.value[i].name === name) {
                editableTabs.value = [editableTabs.value[i]]
                editableTabsValue.value = name
                break
            }
        }
    }
}
// 关闭全部标签页
const removeAllTab = () => {
    editableTabs.value = [{
        title: '首页',
        name: '1',
        content: index,
    }]
    editableTabsValue.value = '1'
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