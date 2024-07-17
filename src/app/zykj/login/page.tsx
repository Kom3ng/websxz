"use client"
import { Card, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useStoreDispatch, useStoreSelector } from '@/store';
import { loginInfoSlice, userInfoSlice } from '@/store/userInfo';
import { api } from '@/utils/api/zykj/apiInstance';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { useImmer } from "use-immer";
import { z } from "zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type FieldType = {
    username: string;
    password: string;
    remember: boolean;
};

const formSchema = z.object({
    username: z.string({ required_error: "用户名不能为空" }),
    password: z.string({ required_error: "密码不能为空" }),
    remember: z.boolean()
});

export default function LoginPage() {
    const dispatch = useStoreDispatch();
    const [isLogining, setIsLogining] = useImmer(false);
    const router = useRouter();
    const params = useSearchParams();
    const isPosting = useRef(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            remember: false,
        }
    });

    const onFinish = async (values: z.infer<typeof formSchema>) => {
        // 防止执行两次
        if (isPosting.current) return;

        // 禁用表单
        isPosting.current = true;
        setIsLogining(true);

        toast({
            description: '登录中...',
        });

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

                toast({
                    description: '登录成功!',
                });

                // 跳转到来源页面 若来自登录页
                const from = params.get('from');
                if (from?.startsWith('/zykj/login')) {
                    router.push('/zykj');
                } else {
                    router.push(params.get('from') || '/zykj');
                }
            }
        }).catch((err) => {
            console.log(err)
            toast({
                description: err.response.data.error.details || err.message || '未知错误',
                variant: "destructive",
            });
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
            <Card className="m-8 w-80">
                <div className="m-4">
                    <CardTitle>Login</CardTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-8 mt-2">
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>用户名</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>密码</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='password' {...field}></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                                <FormField
                                    control={form.control}
                                    name='remember'
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className='space-y-1 leading-none'>
                                                <FormDescription>记住密码</FormDescription>
                                            </div>
                                        </FormItem>
                                        
                                    )}
                                />
                                
      

                            <Button disabled={isLogining} type="submit" className="w-full">
                                登入
                            </Button>
                        </form>
                    </Form>
                </div>
            </Card>
        </div >
    )
}