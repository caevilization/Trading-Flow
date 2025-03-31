import { RouterProvider } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { router } from './routes';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#8B5CF6',
              colorBgContainer: '#13131A',
              colorBorder: '#1F1F2C',
              colorText: '#E2E8F0',
              colorTextSecondary: 'rgba(226, 232, 240, 0.5)',
            },
            components: {
              Tabs: {
                colorBgContainer: '#13131A',
                colorBorderSecondary: '#1F1F2C',
                itemSelectedColor: '#8B5CF6',
                itemHoverColor: '#E2E8F0',
                itemColor: 'rgba(226, 232, 240, 0.5)',
                inkBarColor: '#8B5CF6',
              },
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </StyleProvider>
    </AuthProvider>
  );
}

export default App;
