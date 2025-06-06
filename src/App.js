import './App.css';
import CardElement from './Components/Card';
import NavigationBar from './Components/NavigationBar';
import ProductsGrid from './Components/ProductsGrid';
import { Content } from 'antd/es/layout/layout';
import { Breadcrumb, Layout, Menu, theme, Space } from 'antd';
import Searchbar from './Components/Searchbar';
/*https://preview.themeforest.net/item/timzee-watch-sectioned-shopify-theme/full_screen_preview/24140753*/



function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="App">
      <NavigationBar />
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
          {/* <CardElement imgPath={"https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"} title={"Titan"} description={"Premium Watch"} price={8789} /> */}
        </div>
      </Content>


    </div>
  );
}

export default App;
