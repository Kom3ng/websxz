"use client"
import { useStoreDispatch, useStoreSelector } from '@/store';
import { loginStatusSlice, userInfoSlice } from '@/store/userInfo';
import { api } from '@/utils/api/zykj/apiInstance';
import { Button, Card, Checkbox, Form, Input, message, theme } from 'antd';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useImmer } from "use-immer";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };


export default function LoginPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useStoreDispatch();
    const [isLogining, setIsLogining] = useImmer(false);
    const router = useRouter();
    const params = useSearchParams();

    api.manageApi.getAllWhiteUrlAsync()

    const onFinish = (values: FieldType) => {
        api.manageApi.login({
            userName: values.username,
            password: values.password,
        }).then((res) => {
            if (res.data.error || res.status !== 200){
                api.updateToken('');
                return Promise.reject(res.data.error?.message);
            }
            
            if (res.data.result){
                dispatch(userInfoSlice.actions.setUserInfo(res.data.result));
                dispatch(loginStatusSlice.actions.login())
                messageApi.success('登录成功');
                const token = res.data.result.accessToken
                if (token) {
                    api.updateToken(token);
                }
                
                router.push(params.get('from') || '/');
            }
        }).catch((err) => {
            messageApi.error(err?.message || '未知错误');
        })
    };
    
    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}