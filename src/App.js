import './App.css';
import CardElement from './Components/Card';
import NavigationBar from './Components/NavigationBar';
import ProductsGrid from './Components/ProductsGrid';
import { Content } from 'antd/es/layout/layout';
import { Breadcrumb, Layout, Menu, theme, Space } from 'antd';
import Searchbar from './Components/Searchbar';
import SignIn from './Components/Signin/SigninPage';
import SignUp from './Components/Signup/SignupPage';
import MainContainer from './Components/MainContainer';
/*https://preview.themeforest.net/item/timzee-watch-sectioned-shopify-theme/full_screen_preview/24140753*/



function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="App">
      <MainContainer />
      {/* <SignUp /> */}
      {/* <SignIn /> */}
      {/* <NavigationBar />
      <Content style={{ padding: '0 48px' }}>
        <Space direction='horizontal' style={{display:'flex', justifyContent:'space-between'}}>
          <Breadcrumb
            style={{ margin: '16px 0' ,fontSize:30, fontWeight:500, letterSpacing:'-1px'}}
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
      </Content> */}


    </div>
  );
}

export default App;
