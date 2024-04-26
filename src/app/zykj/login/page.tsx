"use client"
import { useStoreDispatch, useStoreSelector } from '@/store';
import { loginInfoSlice, userInfoSlice } from '@/store/userInfo';
import { api } from '@/utils/api/zykj/apiInstance';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Card, Checkbox, Form, Input, Spin, message } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useImmer } from "use-immer";

type FieldType = {
    username: string;
    password: string;
    remember: boolean;
};


export default function LoginPage() {
    const { message } = App.useApp();
    const dispatch = useStoreDispatch();
    const [isLogining, setIsLogining] = useImmer(false);
    const router = useRouter();
    const params = useSearchParams();
    let isPosting = useRef(false);

    const onFinish = async (values: FieldType) => {
        // 防止执行两次
        if (isPosting.current) return;

        // 禁用表单
        isPosting.current = true;
        setIsLogining(true);

        message.info('登陆中...')

        await api.manageApi.login({
            userName: values.username,
            password: values.password,
        }).then((res) => {

            // 取消自动登录
            if (!values.remember) {
                dispatch(loginInfoSlice.actions.stopAutoLogin());
            }

            // 登陆失败清空token
            if (res.data.error || res.status !== 200) {
                api.updateToken('');
                return Promise.reject(res.data.error?.message);
            }

            if (res.data.result) {
                // 更新用户信息
                dispatch(userInfoSlice.actions.setUserInfo(res.data.result));
                // 记录登陆时间
                dispatch(loginInfoSlice.actions.login())

                // 更新api使用的token
                const token = res.data.result.accessToken
                if (token) {
                    api.updateToken(token);
                }

                // 记录自动登录信息
                if (values.remember) {
                    dispatch(loginInfoSlice.actions.saveLoginInfo({
                        username: values.username,
                        password: values.password
                    }));
                }

                message.success('登录成功');

                // 跳转到来源页面 若来自登录页
                const from = params.get('from');
                if (from?.startsWith('/zykj/login')) {
                    router.push('/zykj');
                } else {
                    router.push(params.get('from') || '/zykj');
                }
            }
        }).catch((err) => {
            message.error(err?.message || '未知错误');
        })

        // 启用表单
        setIsLogining(false);
        isPosting.current = false;
    };

    const loginInfo = useStoreSelector(state => state.loginInfo)
    useEffect(() => {
        if (loginInfo.autoLogin) {
            onFinish({
                username: loginInfo.username,
                password: loginInfo.password,
                remember: true
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex justify-center items-center h-screen">
            <Spin spinning={isLogining}>
                <Card
                    className="m-8 w-80"
                    title="Login"
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        disabled={isLogining}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{
                                width: '100%'
                            }}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        </div>
    )
}