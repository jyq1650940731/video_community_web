<template>
    <!-- 登录框 -->
    <el-dialog style="border-radius: 10px;" v-model="dialogVisible" center width="820" :close-on-click-modal="false"
        destroy-on-close align-center>
        <div class="bala-login-container">
            <div class="bala-login-right-wp">
                <el-tabs v-model="activeName" type="card" class="login-tab" @tab-click="handleClick">
                    <el-tab-pane label="密码登录" name="login" lazy>
                        <el-form class="login-form" ref="formRef" :rules="rules" :model="loginForm">
                            <el-input type="text" class="login_input" v-model="loginForm.username" placeholder="请输入账号">
                                <template #prefix>
                                    <p class="input-tips">账号</p>
                                </template>
                            </el-input>
                            <el-input type="text" autocomplete="off" show-password class="login_input"
                                v-model="loginForm.password" placeholder="请输入密码">
                                <template #prefix>
                                    <p class="input-tips">密码</p>
                                </template>
                            </el-input>
                            <div class="bala-login-btn_wp">
                                <el-button type="primary" :loading="loading" class="bala-login-btn"
                                    @click="handleLogin(formRef)">登录</el-button>
                            </div>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="账号注册" name="register" lazy>
                        <el-input type="text" class="login_input" v-model="registerForm.username" placeholder="请输入账号">
                            <template #prefix>
                                <p class="input-tips">账号</p>
                            </template>
                        </el-input>
                        <el-input type="text" show-password class="login_input" v-model="registerForm.password"
                            placeholder="请输入密码">
                            <template #prefix>
                                <p class="input-tips">密码</p>
                            </template>
                        </el-input>
                        <div class="bala-login-btn_wp">
                            <el-button class="bala-login-btn">注册/登录</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <div class="login-agreement-wp">
                    <p> 登录或完成注册即代表你同意 <span> 用户协议 </span> 和 <span> 隐私政策 <span class="link_word">
                            </span></span></p>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script lang='ts' setup>
import type { TabsPaneContext } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { loginForm as FromRules } from '@/types/request';
import { isPassword } from '@/utils/validate';
import { useUserStore } from '@/stores/modules/user';


const { login } = useUserStore();

const formRef = ref<FormInstance>();
const activeName = ref('login');
const loading = ref(false);
const dialogVisible = ref(false);


const loginForm = reactive<FromRules>({
    username: 'admin12',
    password: '123456'
})
const registerForm = reactive<FromRules>({
    username: '',
    password: ''
})

// 校验
const validateUsername = (rule: any, value: string, callback: any) => {
    console.log(value);
    if (value === '') callback(new Error('用户名不能为空'))
    else callback()
}
const validatePassword = (rule: any, value: string | any[], callback: any) => {
    if (!isPassword(value)) callback(new Error('密码不能少于6位'))
    else callback()
}
const rules = reactive<FormRules<typeof loginForm>>({
    username: [
        {
            required: true,
            trigger: 'change',
            validator: validateUsername
        }
    ],
    password: [
        {
            required: true,
            trigger: 'change',
            validator: validatePassword
        }
    ],
})


const showDialog = () => {
    dialogVisible.value = true;
}


const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

const handleLogin = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            try {
                loading.value = true
                await login({
                    username: loginForm.username,
                    password: loginForm.password
                })
                dialogVisible.value = false;

            }
            finally {
                loading.value = false
            }
        }
    })
}

defineExpose({ showDialog })

</script>
<style lang='scss' scoped>
:deep() {
    .el-tabs__nav-scroll {
        display: flex;
        justify-content: center;
    }

    .el-tabs--card>.el-tabs__header,
    .el-tabs--card>.el-tabs__header .el-tabs__item,
    .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: 0;
    }

    .el-tabs__item {
        font-size: 18px;
    }

    .el-input__wrapper {
        padding: 8px 20px;
        box-shadow: none;
        border: 1px solid #e3e5e7;
    }

    .el-input {
        &:first-of-type .el-input__wrapper {
            border-bottom: 0;
            border-radius: 8px 8px 0 0;
        }

        &:last-of-type .el-input__wrapper {
            border-top: 0;
            border-radius: 0 0 8px 8px;
        }
    }
}


.bala-login-container {
    padding: 10px 40px 60px 40px;
    display: flex;
    justify-content: center;
}

.bala-login {
    &-container {
        padding: 10px 40px 60px 40px;
        display: flex;
        justify-content: center;
    }

    &-right-wp {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &-btn_wp {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        width: 400px;
        text-align: center;
    }

    &-btn {
        width: 100%;
        height: 40px;
        border-radius: 8px;
    }
}

.input-tips {
    color: var(--Ga9_t);
    margin-right: 14px;
    font-size: 18px;

}

.login-agreement-wp {
    width: 351px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%);

    span {
        color: #00a1d6;
        cursor: pointer;
    }
}
</style>
