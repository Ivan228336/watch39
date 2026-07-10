// app/admin/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { Card, Row, Col, Typography } from "antd";
import { useNavigation } from "@refinedev/core";
import {
  TagOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  FileTextOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function AdminDashboardPage() {
  // Хук Refine для программной навигации по ресурсам
  const { list } = useNavigation();

  // Наш массив с настройками карточек для карты навигации
  const navCards = [
    {
      title: "Часы",
      description: "Каталог товаров, цены и остатки",
      icon: <ClockCircleOutlined style={{ fontSize: '42px', color: '#1677ff' }} />,
      resource: "watch", // Имя ресурса из app/admin/layout.tsx
    },
    {
      title: "Бренды",
      description: "Управление производителями",
      icon: <TagOutlined style={{ fontSize: '42px', color: '#52c41a' }} />,
      resource: "brand",
    },
    {
      title: "Категории",
      description: "Управление типами и коллекциями",
      icon: <AppstoreOutlined style={{ fontSize: '42px', color: '#722ed1' }} />,
      resource: "category",
    },
    {
      title: "Блог / Статьи",
      description: "Новости и полезный контент",
      icon: <FileTextOutlined style={{ fontSize: '42px', color: '#fa8c16' }} />,
      resource: "post",
    },
  ];

  return (
    <div style={{ padding: "12px 24px" }}>
      <Title level={2} style={{ marginBottom: "8px" }}>
        Панель управления
      </Title>
      <Text type="secondary">
        Выберите нужный раздел для начала работы:
      </Text>

      {/* Сетка для карточек. Адаптивная: на телефоне 1 колонка, на ПК 4 колонки */}
      <Row gutter={[24, 24]} style={{ marginTop: "32px" }}>
        {navCards.map((card) => (
          <Col xs={24} sm={12} lg={6} key={card.resource}>
            <Card
              hoverable
              onClick={() => list(card.resource)}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              styles={{ 
                body: { 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  textAlign: 'center' 
                } 
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                {card.icon}
              </div>
              <Title level={4} style={{ marginTop: 0 }}>
                {card.title}
              </Title>
              <Text type="secondary">
                {card.description}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}