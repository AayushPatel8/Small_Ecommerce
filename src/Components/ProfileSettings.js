import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import {
    Button,
    Form,
    Input,
    DatePicker,
    Select,
    Avatar,
    Space,
    Card,
    Upload,
    Row,
    Col,
    Modal
} from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { addUser, getUser } from "../Firebase/firestore";
import DragAndDrop from './DragAndDrop';
import { setNewUser, setProfilePicture } from '../Actions/productSlice';
import { useNavigate } from 'react-router-dom';



const countryOptions = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AL', label: 'Albania' },
    { value: 'DZ', label: 'Algeria' },
    { value: 'AD', label: 'Andorra' },
    { value: 'AO', label: 'Angola' },
    { value: 'AR', label: 'Argentina' },
    { value: 'AM', label: 'Armenia' },
    { value: 'AU', label: 'Australia' },
    { value: 'AT', label: 'Austria' },
    { value: 'AZ', label: 'Azerbaijan' },
    { value: 'BD', label: 'Bangladesh' },
    { value: 'BE', label: 'Belgium' },
    { value: 'BR', label: 'Brazil' },
    { value: 'CA', label: 'Canada' },
    { value: 'CN', label: 'China' },
    { value: 'CO', label: 'Colombia' },
    { value: 'CU', label: 'Cuba' },
    { value: 'DK', label: 'Denmark' },
    { value: 'EG', label: 'Egypt' },
    { value: 'FR', label: 'France' },
    { value: 'DE', label: 'Germany' },
    { value: 'GR', label: 'Greece' },
    { value: 'HK', label: 'Hong Kong' },
    { value: 'IN', label: 'India' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'IR', label: 'Iran' },
    { value: 'IQ', label: 'Iraq' },
    { value: 'IE', label: 'Ireland' },
    { value: 'IL', label: 'Israel' },
    { value: 'IT', label: 'Italy' },
    { value: 'JP', label: 'Japan' },
    { value: 'KE', label: 'Kenya' },
    { value: 'KR', label: 'South Korea' },
    { value: 'MX', label: 'Mexico' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'NO', label: 'Norway' },
    { value: 'PK', label: 'Pakistan' },
    { value: 'PH', label: 'Philippines' },
    { value: 'PL', label: 'Poland' },
    { value: 'PT', label: 'Portugal' },
    { value: 'QA', label: 'Qatar' },
    { value: 'RO', label: 'Romania' },
    { value: 'RU', label: 'Russia' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'SG', label: 'Singapore' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'ES', label: 'Spain' },
    { value: 'LK', label: 'Sri Lanka' },
    { value: 'SE', label: 'Sweden' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'TH', label: 'Thailand' },
    { value: 'TR', label: 'Turkey' },
    { value: 'UA', label: 'Ukraine' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'VN', label: 'Vietnam' },
    // Add more if needed
];


const ProfileSettings = () => {

    const initialFormData = {
        profilePicture: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: null,
        country: '',
        mobileNo: ''
    }

    const [formData, setFormData] = useState(initialFormData);
    const [email, setEmail] = useState('');
    const [memberSince, setMemberSince] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const newUser = useSelector((state) => state.products.newUser)
    const [componentDisabled, setComponentDisabled] = useState(!newUser);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const [open, setOpen] = useState(false);
    const showConfirmModal = () => {
        setOpen(true);
    };

    const hideConfirmModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUser();
            setFormData({
                profilePicture: userData.profilePicture || '',
                firstName: userData.firstName || '',
                middleName: userData.middleName || '',
                lastName: userData.lastName || '',
                dateOfBirth: userData.dateOfBirth ? moment(userData.dateOfBirth.toDate()) : null,
                country: userData.country || '',
                mobileNo: userData.mobileNo || ''
            })
            setEmail(userData.email)
            setMemberSince(userData.memberSince)
            dispatch(setProfilePicture(userData.profilePicture));
            form.setFieldsValue({
                firstname: userData.firstName || '',
                middlename: userData.middleName || '',
                lastname: userData.lastName || '',
                dateofbirth: userData.dateOfBirth ? moment(userData.dateOfBirth.toDate()) : null,
                country: userData.country || '',
                mobileno: userData.mobileNo || '',
                profilePicture: userData.profilePicture || ''
            });
        }
        fetchUserData();
    }, []);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async () => {
        const dataToSend = {
            ...formData,
            dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toDate() : null
        }
        console.log(dataToSend);
        setComponentDisabled(true);
        addUser(dataToSend);
        dispatch(setProfilePicture(dataToSend.profilePicture));
        dispatch(setNewUser(false));
        navigate('/');
    };

    const handleModalOk = async()=>{
        hideConfirmModal();
        await handleSubmit();
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='container' style={{ display: 'flex', position: 'relative', justifyContent: 'center', marginTop: 32 }}>
                <Card
                    title={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>Profile Settings</span>
                            {componentDisabled ?
                                <Button
                                    type="primary"
                                    icon={<EditOutlined />}
                                    onClick={() => setComponentDisabled(false)}
                                    size="medium"
                                >
                                    Edit
                                </Button> : <></>}
                        </div>
                    }
                    style={{ width: 700, maxWidth: '90vw', boxShdow: '0 2px 8px #f0f1f2' }}
                    bodyStyle={{ padding: 24 }}
                >

                    <Space>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Avatar size={96} src={formData.profilePicture !== '' ? formData.profilePicture : undefined} icon={<UserOutlined />} />
                            {!componentDisabled ?
                                <span onClick={showModal}
                                    style={{
                                        position: 'absolute',
                                        right: 4,
                                        bottom: 4,
                                        background: '#fff',
                                        borderRadius: '50%',
                                        padding: 4,
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <EditOutlined style={{ fontSize: 18, color: '#1890ff' }} />
                                </span> : <></>}
                            <Modal
                                title="Basic Modal"
                                closable={{ 'aria-label': 'Custom Close Button' }}
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okText="Upload"
                            >
                                <DragAndDrop />
                            </Modal>
                        </div>
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={console.log('')}
                            accept="image/*"
                        >
                        </Upload>
                        <Space direction='vertical'>
                            <h1 style={{ fontSize: 28, margin: 0 }}>{formData.firstName} {formData.lastName}</h1>
                            <p>{email}</p>
                            <p>Member Since {memberSince}</p>
                        </Space>
                    </Space>
                    <Form
                        form={form}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        layout="vertical"
                        style={{ width: '100%', marginTop: '25px' }}
                        onFinish={showConfirmModal}
                        disabled={componentDisabled}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="First Name: " name="firstname" rules={[{ required: true, message: 'Please add your first name.' }]}>
                                    <Input
                                        style={{ width: '100%', height: 48, fontSize: 18 }}
                                        value={formData.firstName}
                                        onChange={e => handleChange('firstName', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Middle Name: " name="middlename" rules={[{ required: true, message: 'Please add your middle name.' }]}>
                                    <Input
                                        style={{ width: '100%', height: 48, fontSize: 18 }}
                                        value={formData.middleName}
                                        onChange={e => handleChange('middleName', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Last Name: " name="lastname" rules={[{ required: true, message: 'Please add your last name.' }]}>
                            <Input
                                value={formData.lastName}
                                style={{ width: '100%', height: 48, fontSize: 18 }}
                                onChange={e => handleChange('lastName', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Date of Birth: " name="dateofbirth" rules={[{ required: true, message: 'Please add your date of birth.' }]}>
                            <DatePicker
                                style={{ width: '100%', height: 48, fontSize: 18 }}
                                value={formData.dateOfBirth}
                                onChange={date => handleChange('dateOfBirth', date)}
                            />
                        </Form.Item>
                        <Form.Item label="Country: " name="country"
                            rules={[{ required: true, message: 'Please select your country!' }]}>
                            <Select
                                style={{ width: '100%', height: 48, fontSize: 18 }}
                                showSearch
                                placeholder="Select country"
                                filterOption={(input, options) => {
                                    var _a;
                                    return (
                                        (_a = options === null || options === void 0 ? void 0 : options.label) !== null &&
                                            _a !== void 0
                                            ? _a
                                            : ''
                                    )
                                        .toLowerCase()
                                        .includes(input.toLowerCase());
                                }}
                                options={countryOptions}
                                value={formData.country}
                                onChange={value => handleChange('country', value)}
                            />
                        </Form.Item>
                        <Form.Item label="Mobile No" name="mobileno" rules={[{ required: true, message: 'Please add your mobile no.' }]}>
                            <Input
                                style={{ width: '100%', height: 48, fontSize: 18 }}
                                type="tel"
                                value={formData.mobileNo}
                                pattern="[0-9]{10}"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/, "");
                                    handleChange('mobileNo', value)
                                }}

                            />
                        </Form.Item>
                        <Form.Item label="Profile URL: ">
                            <Input
                                value={formData.profilePicture}
                                style={{ width: '100%', height: 48, fontSize: 18 }}
                                onChange={e => handleChange('profilePicture', e.target.value)} />
                        </Form.Item>
                        {!componentDisabled ?
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size='large' block>
                                    Submit
                                </Button>
                                <Modal
                                    title="Confirm"
                                    open={open}
                                    onOk={handleModalOk}
                                    onCancel={hideConfirmModal}
                                    okText="Confirm"
                                    cancelText="Cancel"
                                >
                                    <p>Confirm Submit?</p>
                                </Modal>
                            </Form.Item> : <></>}

                    </Form>
                </Card>
            </div>
        </>
    );
}

export default ProfileSettings;