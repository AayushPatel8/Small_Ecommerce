import { Button, Card, Space, Modal,Rate,Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Counter from './Counter';
import { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UpdateItem from './UpdateItem';
import { useDeleteProduct } from '../react-query/useProductMutations';

const { Meta } = Card;


const CardElement = ({ imgPath, title, description, price, id, rating, isNew }) => {
    const {mutate:deleteProduct, isLoading} = useDeleteProduct();
    const [showCounter, setShowCounter] = useState(false);
    const [modal, contextHolder] = Modal.useModal();
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [updateId, setUpdateId] = useState("");

    const confirm = (id) => {
        modal.confirm({
            title: 'Alert',
            icon: <ExclamationCircleOutlined />,
            content: 'Confirm Delete?',
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: () => {
                deleteProduct(id);
            }
        });
    };

    return (
        <Card
            hoverable
            style={{
                width: '20vw',
                minWidth: 250,
                borderRadius: 12,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                margin: '16px auto',
                background: '#fafbfc'
            }}
            cover={<img
                alt={title}
                // src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"
                src={imgPath}
                style={{ height: 180, objectFit: 'cover' }}
            />}
        >
            <Meta title={<span style={{ fontWeight: 600, fontSize: 20 }}>{title}</span>}
                description={<span style={{ color: '#888', fontSize: 14 }}><Typography.Text ellipsis={{rows:1}}>{description}</Typography.Text></span>} />
            <div style={{ margin: '18px 0 8px 0', fontSize: 22, fontWeight: 500, display: 'flex', justifyContent: 'space-between', textWrap: 'nowrap'}}>
                <div>
                    Price: <span style={{ color: '#1976d2' }}>₹{price}</span>
                </div>
                {showCounter ? <Counter func={setShowCounter} /> : <Button
                    type='primary'
                    icon={<ShoppingCartOutlined />}
                    style={{
                        borderRadius: '50%',
                        width:40,
                        height:40,
                        fontWeight: 500,
                        letterSpacing: 1,
                        fontSize: '25px',
                        position: 'absolute',
                        right: 20
                    }}
                    onClick={() => setShowCounter(true)}
                >
                </Button>}

            </div>
            <Rate disabled value={rating} />
            <div style={{position:'absolute',bottom:'36%',right:20}}>
                <Space size="middle">
                    <div className="delete" onClick={() => (confirm(id))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-delete-icon lucide-delete"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" /><path d="m12 9 6 6" /><path d="m18 9-6 6" /></svg>
                    </div>
                    {contextHolder}
                    {/* <div className="update" onClick={() => (navigate(`/update/${record.id}`))}> */}
                    <div className="update" onClick={() => {
                        // setSelectedId(record.id);
                        setOpenUpdateModal(true);
                        setUpdateId(id);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                    </div>
                    <Modal
                        title="Update Product"
                        centered
                        open={openUpdateModal}
                        onOk={() => setOpenUpdateModal(false)}
                        onCancel={() => setOpenUpdateModal(false)}
                        footer={null}
                        width={{
                            xs: '90%',
                            sm: '80%',
                            md: '70%',
                            lg: '60%',
                            xl: '50%',
                            xxl: '40%',
                        }}
                    >
                        <UpdateItem title={title} imgPath={imgPath} description={description} price={price} id={id} rating={rating} isNew={isNew} openUpdateModal={openUpdateModal} reset={setOpenUpdateModal}/>
                    </Modal>

                </Space>
            </div>

        </Card>
    )
};
export default CardElement;