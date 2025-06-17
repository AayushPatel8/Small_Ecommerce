import SignIn from "./Signin/SigninPage";
import SignUp from "./Signup/SignupPage";
import NavigationBar from './NavigationBar';
import ProductsGrid from './ProductsGrid';
import { Content } from 'antd/es/layout/layout';
import { LoadingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Space, Button, Flex, Spin } from 'antd';
import Searchbar from './Searchbar';
import { use, useState, useEffect } from "react";
import signin from "../Firebase/signin";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../Actions/productSlice";
import ProfileSettings from "./ProfileSettings";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProtectedRoutes from "../utils/ProtectedRoutes";


const MainContainer = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)
    const [authPage, setAuthPage] = useState('signin');
    const auth = useSelector((state) => state.products.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setAuth(true));
            }
            else {
                dispatch(setAuth(false));
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [dispatch]);

    // if (!auth) {
    //     if (authPage === 'signin') {
    //         return (<SignIn authPage={authPage} setAuthPage={setAuthPage} />);
    //     }
    //     else if (authPage === 'signup') {
    //         return (<SignUp authPage={authPage} setAuthPage={setAuthPage} />);
    //     }
    // }
    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    width: '100vw',
                    background: '#fff',
                }}
            >
                <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
            </div>
        )
    }

    return (
        <Router>

            <Routes>
                {!auth && (
                    <>
                        <Route path="/signin" element={<SignIn authPage={authPage} setAuthPage={setAuthPage} />} />
                        <Route path="/signup" element={<SignUp authPage={authPage} setAuthPage={setAuthPage} />} />
                        <Route path="*" element={<Navigate to="/signin" replace />} />
                    </>
                )}
                {auth && (
                    <>

                        <Route path='/profile' element={<><NavigationBar /><Content style={{ padding: '0 48px' }}><ProfileSettings /></Content></>} />
                        <Route element={<ProtectedRoutes />}>

                            <Route path='/' element={
                                <>
                                    <NavigationBar />
                                    <Content style={{ padding: '0 48px' }}>
                                        <Space direction='horizontal' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Breadcrumb
                                                style={{ margin: '16px 0', fontSize: 30, fontWeight: 500, letterSpacing: '-1px' }}
                                                items={[{ title: 'E-commerce Website' }]}
                                            />
                                            <Searchbar />
                                        </Space>
                                        <div
                                            style={{
                                                background: colorBgContainer,
                                                minHeight: 280,
                                                padding: 24,
                                                borderRadius: borderRadiusLG,
                                            }}
                                        >
                                            <ProductsGrid />
                                        </div>
                                    </Content>
                                </>
                            } />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default MainContainer;