import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    AppstoreOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    DashboardOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Input, Badge, theme, Image } from 'antd';
import amazonLogo from "../../assets/logo/amazon.png";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const Layouts = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider style={siderStyle} trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                        <Link to="/shopping-cart">Shopping Cart</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<AppstoreOutlined />}>
                        <Link to="/products">Products</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        <Link to="/customers">Customers</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "#fff",
                        padding: "0 20px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // Light shadow for depth
                    }}
                >
                    {/* Logo & Menu Toggle Button */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: "18px" }}
                        />
                        <Image width={120} src={amazonLogo} preview={false} />
                    </div>

                    {/* Search Bar */}
                    <Input
                        placeholder="Search for products..."
                        prefix={<SearchOutlined />}
                        style={{
                            width: "40%",
                            borderRadius: "8px",
                            padding: "8px",
                            fontSize: "16px",
                        }}
                    />

                    {/* Icons: Cart & User Profile */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        {/* Shopping Cart with Badge */}
                        <Badge count={3} size="small">
                            <ShoppingCartOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
                        </Badge>

                        {/* User Account */}
                        <UserOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        height: '100vh',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/* <main className="p-5"> */}
                    <Outlet />
                    {/* </main> */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Layouts;
