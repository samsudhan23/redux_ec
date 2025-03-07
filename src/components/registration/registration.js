import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, InputNumber } from 'antd';
import Styles from "../../style.module.css"
import { useDispatch } from 'react-redux';
import { authregister } from '../../app/redux/slices/authSlice';

const Registration = () => {
    const [form] = Form.useForm();
    // const { result, status, error } = useSelector((state) => state.authentication);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
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
            const response = await dispatch(authregister(values));
            if (response.payload.code === 200) {
                success(response.payload.message, 'success')
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            } else {
                success(response.payload.message, 'error')
            }
        }
        catch (err) {
            console.log('err: ', err);
        }
    };

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

                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item

                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Phone Number!',
                        },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    className={Styles.topPadding}

                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
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
                <p style={{ textAlign: 'center' }}>Already have an account? <a href="/">Login</a></p>
            </Form>
        </div>
    )
}

export default Registration