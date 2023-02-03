<template>
    <div class="bg-pic">
        <el-dropdown style="float: right;margin: 22px 22px 0px 0px;">
            <span class="el-dropdown-link">
                <IconPark type="translate" size="22" />
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
        <div class="title-and-card">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>{{ t('login.cardTitle') }}</span>
                    </div>
                </template>
                <el-form :model="form" :rules="rules">
                    <el-form-item prop="userName">
                        <el-input v-model="form.userName" clearable :placeholder="t('login.userNamePlaceholder')"
                            :prefix-icon="User" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="form.password" clearable show-password
                            :placeholder="t('login.passwordPlaceholder')" :prefix-icon="Lock" />
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="onShow">{{ t('login.buttonText') }}</el-button>
                        <Vcode :show="isShow" @success="onSuccess" @close="onClose"
                            :successText="t('login.puzzle.successText')" :failText="t('login.puzzle.failText')" :sliderText="t('login.puzzle.sliderText')"/>
                    </div>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue"
import { Lock, User } from "@element-plus/icons-vue"
import router from "@/router";
import axiosUtil from '@/util/axios'
import Vcode from "vue3-puzzle-vcode"
import { IconPark } from '@icon-park/vue-next/es/all'
import { useI18n } from 'vue-i18n'//要在js中使用国际化

import { useSettingStore } from "@/stores/index";
const store = useSettingStore();

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

const form = ref({
    userName: "",
    password: "",
});
const rules = {
    userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};
const handleLogin = async () => {
    let params = new URLSearchParams();
    params.append("userName", form.value.userName);
    params.append("password", form.value.password);
    let url = '/administrator/login';
    try {
        const result = await axiosUtil.get(url, params);
        if (result.data.code === 0) {
            window.sessionStorage.setItem("userName", result.data.userName);
            window.sessionStorage.setItem("administratorId", result.data.id);
            window.sessionStorage.setItem("token", result.data.token);
            router.replace('/main');
        } else if (result.data.code === 500) {
            ElMessage.error(result.data.msg);
        }
    } catch (err) {
        console.log("error:" + err);
        ElMessage.error("服务器出错，请联系管理员！");
    }
}

// 用于控制右滑拼图验证模态框是否关闭
const isShow = ref(false);
// 打开模态框
const onShow = () => {
    if (form.value.userName === "") {
        ElMessage.error(t('login.userNameNullHint'));
        return false;
    }
    if (form.value.password === "") {
        ElMessage.error(t('login.passwordNullHint'));
        return false;
    }
    isShow.value = true;
};
// 关闭模态框
const onClose = () => {
    isShow.value = false;
};
// 验证通过
const onSuccess = () => {
    onClose();
    window.sessionStorage.setItem("token", "1")
    router.replace('/main')
};
</script>

<style scoped>
.bg-pic {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    zoom: 1;
    background-color: #fff;
    background-image: url(@/assets/images/bg.jpeg);
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
}

.bg-pic .title-and-card {
    margin-top: 10%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-card {
    width: 32%;
    margin-left: 34%;
}

.login-btn {
    text-align: center;
}
</style>