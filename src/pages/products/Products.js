import React from 'react'
import { Card, Button } from 'antd';
import {
    PlusOutlined,
    MinusOutlined,
} from '@ant-design/icons';
import Styles from '../../style.module.css';
import prodImage from '../../assets/products/tshirt.webp'
const { Meta } = Card;

const Products = () => {

    return (
        <div>

            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img alt="example" style={{ height: '250px' }} src={prodImage} />}
            >
                <Meta title="Saturo Gojo" description="www.instagram.com" />
                <div className={Styles.products}>
                    <Button color="cyan" shape="circle" icon={<PlusOutlined />} variant="filled" />
                    <span className={Styles.productIcon}>80</span>
                    <Button color="danger" shape="circle" icon={<MinusOutlined />} variant="filled" />

                </div>
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <Button variant="filled" style={{ border: '1px solid #722ed1' }} color="purple">Add to Cart</Button>
                </div>
            </Card>
        </div>
    )
}

export default Products