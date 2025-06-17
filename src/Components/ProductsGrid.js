import { Row, Col, Spin } from "antd";
import CardElement from "./Card";
import { useSelector } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons';
import { useProducts } from "../react-query/useProducts";

export default function ProductsGrid() {
    const searchValue = useSelector((state) => state.search.value)
    const {isPending:isLoading, isError,data:products,  error} = useProducts();

    const filteredProducts = Object.values(products || {}).filter(product => product.product_name.toLowerCase().includes(searchValue.toLowerCase()))

    if(isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                width:'100%'
            }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
        )
    }
    if(isError) {
        return (
            <div className="notfound">
                {error? error : 'Server Unreachable'}
            </div>
        )
    }

    return (
        <>
            {filteredProducts.length === 0 ? (
                <div className="notfound">
                    No Item Found
                </div>
            ) : (
                <Row gutter={[16, 16]} justify='left'>
                    {filteredProducts.map(product => (
                        <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                            <CardElement imgPath={product.product_image} title={product.product_name} description={product.product_data.descrption} price={product.product_data.prize} id={product._id} rating={product.product_data.rating} isNew={product.product_data.is_new} />
                        </Col>
                    ))}
                </Row>
            )
            }
        </>
    )
}