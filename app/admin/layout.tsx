// app/admin/layout.tsx
import { ConfigProvider, App as AntdApp } from 'antd';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <AntdApp>
        {/* Здесь можно добавить ваш Header/Sidebar, если вы делали их сами */}
        <main>{children}</main>
      </AntdApp>
    </ConfigProvider>
  );
}