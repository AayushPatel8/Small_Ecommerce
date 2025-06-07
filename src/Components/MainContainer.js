import SignIn from "./Signin/SigninPage";
import SignUp from "./Signup/SignupPage";
import NavigationBar from './NavigationBar';
import ProductsGrid from './ProductsGrid';
import { Content } from 'antd/es/layout/layout';
import { Breadcrumb, Layout, Menu, theme, Space } from 'antd';
import Searchbar from './Searchbar';
import { use, useState } from "react";
import signin from "../Firebase/signin";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../Actions/productSlice";

const DemoSignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSignIn = async () => {
        // Handle sign-in logic here
        try {
            await signin(username, password);
            dispatch(setAuth(true));
        } catch (error) {
            console.error('Sign-in error:', error);
        }
    }

    return (
        <>
            <input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignIn}>Sign In</button>
        </>
    )

};

const MainContainer = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authPage, setAuthPage] = useState('signin');
    const auth = useSelector((state) => state.products.auth);
    const dispatch = useDispatch();
    if (!auth) {
        if (authPage === 'signin') {
            return (<SignIn authPage={authPage} setAuthPage={setAuthPage} />);
            // return (<DemoSignIn />);
        }
        else if (authPage === 'signup') {
            return (<SignUp authPage={authPage} setAuthPage={setAuthPage} />);
        }
    }

    return (
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
    );
}

export default MainContainer;