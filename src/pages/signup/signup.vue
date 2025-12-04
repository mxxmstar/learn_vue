<template>
    <div class="signup-container">
        <el-card class="signup-card">
            <template #header>
                <div class="card-header">
                    <span>用户注册</span>
                </div>
            </template>
            <el-form
                ref="signupFormRef"
                :model="signupForm"
                :rules="signupRules"
                label-width="80px"
                @submit.prevent="handleSignup"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input
                        v-model="signupForm.username"
                        placeholder="请输入用户名"
                    />
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input
                        v-model="signupForm.email"
                        placeholder="请输入邮箱"
                        :formatter="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                        :parser="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                    />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="signupForm.password"
                        type="password"
                        show-password
                        placeholder="请输入密码"
                        :formatter="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                        :parser="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                    ></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input
                        v-model="signupForm.confirmPassword"
                        type="password"
                        show-password
                        placeholder="请再次输入密码"
                        :formatter="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                        :parser="(value: string) => value.replace(/[\u4e00-\u9fa5]/g, '')"
                    ></el-input>
                </el-form-item>

                <el-form-item class="button-container">
                    <el-button
                        type="primary"
                        @click="handleSignup"
                        :loading="loading"

                        class="signup-button"
                    >
                        注册
                    </el-button>
                </el-form-item>
            </el-form>

            <div class="login-link">
                已有账号？<el-button type="text" @click="goToLogin"
                    >立即登录</el-button
                >
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import axios from "axios";
import { useRouter } from "vue-router";

interface SignupForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const router = useRouter();
const signupFormRef = ref<FormInstance>();
const loading = ref(false);


const signupForm = reactive<SignupForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const validateConfirmPassword = (rule: any, value: string, callback: any) => {
    if (value === "") {
        callback(new Error("请再次输入密码"));
    } else if (value !== signupForm.password) {
        callback(new Error("两次输入的密码不一致"));
    } else {
        callback();
    }
};

const signupRules = reactive<FormRules>({
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
            min: 3,
            max: 16,
            message: "用户名长度应在3到16个字符之间",
            trigger: "blur",
        },
        {
            pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
            message: "用户名只能包含中文、英文字母、数字和下划线",
            trigger: "blur",
        },
    ],
    email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "请输入有效的邮箱地址",
            trigger: "blur",
        },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
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
    ],
    confirmPassword: [
        { required: true, validator: validateConfirmPassword, trigger: "blur" },
    ],
});

const handleSignup = async () => {
    if (!signupFormRef.value) return;

    await signupFormRef.value.validate(async (valid) => {
        if (valid) {
            loading.value = true;
            try {
                // 发送注册请求到后端 /user/signup 接口
                const response = await axios.post("/user/auth/signup", {
                    email: signupForm.email,
                    username: signupForm.username,
                    password: signupForm.password,
                    confirmPassword: signupForm.confirmPassword,
                });

                if (response.data.success) {
                    ElMessage.success("注册成功!");
                    // 注册成功后跳转到登录页
                    router.push("/login");
                } else {
                    ElMessage.error(response.data.message || "注册失败");
                }
            } catch (error: any) {
                console.error("注册错误:", error);
                ElMessage.error(
                    error.response?.data?.message || "注册失败，请稍后重试"
                );
            } finally {
                loading.value = false;
            }
        }
    });
};

const goToLogin = () => {
    router.push("/login");
};

</script>

<style scoped>
.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.signup-card {
    width: 400px;
    max-width: 90%;
}

.card-header {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}

.login-link {
    text-align: center;
    margin-top: 20px;
}

.password-toggle {
    cursor: pointer;
    color: #909399;
}

.password-toggle:hover {
    color: #409eff;
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
.signup-button {
    width: 220px;
    height: 40px;
    font-size: 16px;
}
</style>
