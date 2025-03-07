import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, fetchUsers, updateUser, deleteUser } from './userSlice';
import { Button, Form, Input, Table } from 'antd';

const Users = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.users);
    const [editingUser, setEditingUser] = useState(null)
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsers())
        }
    }, [dispatch, status])

    // const dataSource = users; 
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <>
                    <Button  onClick={() => editUser(record)}>Edit</Button >
                    <Button  onClick={() => handleDeleteUser(record.id)}>Delete</Button >
                </>
            ),
        },
    ];

    const editUser = (e) => {
        setEditingUser(e)
        form.setFieldsValue({ name: e.name, email: e.email })
    }

    const handleDeleteUser = (e) => {
        dispatch(deleteUser(e))
    }

    const onFinish = (values) => {
        if (!editingUser) {
            dispatch(addUser({ ...values }))
            form.resetFields();
        } else {
            const updateValue = users.filter((item) => item.id === editingUser.id)
            const val = { ...updateValue[0], ...values }
            dispatch(updateUser(val)).then((action) => {
                if (action.meta.requestStatus === "fulfilled") {
                    // dispatch(fetchUsers())
                }
            });
            form.resetFields();
            setEditingUser(null)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            <h2>Users List</h2>

            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}

            <Form form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
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
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
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

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        {editingUser ? "Update" : "Add"}
                    </Button>


                </Form.Item>
            </Form>

            {/* {status === "succeeded" && (
                <ul>
                    {users.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.email}
                            <button onClick={() => editUser(item)}>Edit</button>
                            <button onClick={() => handleDeleteUser(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )} */}
            {status === "succeeded" && (
                <Table dataSource={users} columns={columns} />
            )}
        </div>
    )
}

export default Users