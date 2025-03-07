import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import Styles from "../../style.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../app/redux/slices/authSlice';



const Login = () => {
    const [form] = Form.useForm()
    // const { status, result, error } = useSelector((state) => state.authentication)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        // console.log(status, 'status1');
    })

    // Message
    const success = (message, type) => {
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const onFinish = async (values) => {
        try {
            const response = await dispatch(authLogin(values))
            if (response.payload.code === 200) {
                success(response.payload.message, 'success')
                setTimeout(() => {
                    navigate("/dashboard")
                }, 1000)
            } else {
                success(response.payload.message, 'error')
            }
            form.resetFields();
        }
        catch (err) {
            console.log('err: ', err);
        }
    };

    // const onFinish = (values) => {

    //     dispatch(authLogin(values)).unwrap().then(() => {
    //         success('success Login', 'success')
    //         navigate("/dashboard")
    //     })


    // };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={Styles.card}>
            {contextHolder}
            <Form form={form}
                name="basic"
                layout="vertical"
                style={{
                    width: 400,
                    background: 'aliceblue',
                    borderRadius: '10px',
                    padding: '20px'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item

                    label="Username"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className={Styles.topPadding}

                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null} style={{ paddingTop: 15, textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                <p style={{ textAlign: 'center' }}>Don't have an account? <a href="/register">Register</a></p>
            </Form>
        </div>
    )
}

export default Login