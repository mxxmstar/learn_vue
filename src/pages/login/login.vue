<template>
    <div class="login-container">
        <div class="bg-blur-layer"></div>
        <el-card class="login-card">
            <template #header>
                <div class="card-header">
                    <span>用户登录</span>
                </div>
            </template>
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginRules"
                label-width="80px"
                @submit.prevent="handleLogin"
            >
            <el-form-item label="邮箱" prop="email">
                    <el-input
                        v-model="loginForm.email"
                        placeholder="请输入邮箱"
                        :formatter="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                        :parser="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                        auto-complete="off"
                    />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="loginForm.password"
                        placeholder="请输入密码"
                        type="password"
                        show-password
                        :formatter="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                        :parser="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                        @paste="handlePaste"
                        auto-complete="off"
                    />
            </el-form-item>

            <el-form-item class="button-container">
                <el-button
                    type="primary"
                    native-type="submit"
                    :loading="loading"
                    class="login-button"
                >
                    登录
                </el-button>
                <!-- <el-button @click="goToSignUp">注册</el-button> -->
            </el-form-item>
            </el-form>
            <div class="signup-link">
                还没有账号？<el-button type="text" @click="goToSignUp">立即注册</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules} from 'element-plus'
import { login, type LoginRequest } from '../../api/auth'
import { useRouter } from 'vue-router'

interface LoginForm {
    email: string;
    password: string;
}

const router = useRouter();
const loginFormRef = ref<FormInstance>();
const loading = ref(false);

const loginForm = reactive<LoginForm>({
    email: '',
    password: '',
});

const loginRules = reactive<FormRules>({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "请输入有效的邮箱地址",
            trigger: "blur",
        }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            min: 6,
            max: 20,
            message: "密码长度应在6到20个字符之间",
            trigger: "blur",
        },
        {
            pattern: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>~`';/_+=\[\]\\-]+$/,
            message: "密码只能包含英文字母、数字和特殊符号(!@#$%^&*等)",
            trigger: "blur",
        },
    ]
})

// 处理粘贴事件
const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    ElMessage.warning("密码输入框不允许粘贴！");
};
const handleLogin = async () => {
    if (!loginFormRef.value) return;

    await loginFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            loading.value = true;
            // try {
            //     // 发送登录请求到后端 /user/login 接口
            //     const response = await axios.post('/user/auth/login', {
            //         email: loginForm.email,
            //         password: loginForm.password,
            //     });

            //     if (response.data.success) {
            //         ElMessage.success("登录成功！");
            //         // TODO: 跳转到首页
            //     } else {
            //         ElMessage.error(response.data.message || "登录失败！");
            //     }
            // } catch (error : any) {
            //     ElMessage.error(error.response?.data?.message || "登录失败！");
            // } finally {
            //     loading.value = false;
            // }

            try {
                // 准备登录数据
                const loginData: LoginRequest = {
                    email: loginForm.email,
                    password: loginForm.password,
                };

                // 调用登录接口，发送登录请求
                const response = await login(loginData);

                if (response.success) {
                    ElMessage.success("登录成功！");
                    // TODO: 跳转到首页
                } else {
                    ElMessage.error(response.message || "登录失败！");
                }
            } catch (error: any) {
                const errorMessage =
                    (error && error.message) ||
                    (error && error.response && error.response.data && error.response.data.message) ||
                    "登录失败！";
                ElMessage.error(errorMessage);
            } finally {
                loading.value = false;
            }
        }
    });
};

const goToSignUp = () => {
    router.push('/signup');
};


</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f569;
    user-select: none;  /* 禁止用户选中文本 */
    position: relative;
}

.bg-blur-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/bg_signup.svg') no-repeat center center;
    background-size: cover;
    filter: blur(0.5px);
    z-index: -1;
}

.bg-blur-layer::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
    z-index: -1;
}

.login-card {
    width: 400px;
    max-width: 90%;
    background: rgba(255, 255, 255, 0.526);
    /* backdrop-filter: blur(10px); */
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    z-index: 2;
}

.card-header {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #469cfd; /* 浅蓝色主题 */
}

.signup-link {
    text-align: center;
    margin-top: 20px;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.button-container :deep(.el-form-item__content) {
    justify-content: center;
    margin-left: 0 !important;
}

.login-button {
    width: 220px;
    height: 40px;
    font-size: 16px;
}

.login-button:hover {
    background: linear-gradient(135deg, #7ec0ee, #4169e1);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(70, 130, 180, 0.4);
}

/* 允许在输入框中选择文本 */
:deep(.el-input__inner) {
    user-select: text;
}
</style>
