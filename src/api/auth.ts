import axios from 'axios'


// axios.defaults.baseURL = 'http://localhost:8080'
// 注册请求接口
export interface SignupRequest {
    email: string
    username: string
    password: string
    confirmPassword: string
}

// 响应数据接口
export interface ApiResponse<T = any> {
    success: boolean
    message: string
    data?: T
}

// 用户注册
export const signup = async (data: SignupRequest): Promise<ApiResponse> => {
    try {
        const response = await axios.post('/user/auth/signup', data)
        return response.data
    } catch (error: any) {
        throw error.response?.data || {
            success: false,
            message: error.message || '注册失败'
        }
    }
}
