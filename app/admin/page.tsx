'use client';

import Link from 'next/link';
import { Card, Row, Col, Typography } from "antd";
import {
  TagOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  FileTextOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function AdminDashboardPage() {
  const navCards = [
    {
      title: "Часы",
      description: "Каталог товаров, цены и остатки",
      icon: <ClockCircleOutlined style={{ fontSize: '42px', color: '#1677ff' }} />,
      path: "/admin/watch", // Прямой путь к странице
    },
    {
      title: "Бренды",
      description: "Управление производителями",
      icon: <TagOutlined style={{ fontSize: '42px', color: '#52c41a' }} />,
      path: "/admin/brand",
    },
    {
      title: "Категории",
      description: "Управление типами и коллекциями",
      icon: <AppstoreOutlined style={{ fontSize: '42px', color: '#722ed1' }} />,
      path: "/admin/category",
    },
    {
      title: "Блог / Статьи",
      description: "Новости и полезный контент",
      icon: <FileTextOutlined style={{ fontSize: '42px', color: '#fa8c16' }} />,
      path: "/admin/post",
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

      <Row gutter={[24, 24]} style={{ marginTop: "32px" }}>
        {navCards.map((card) => (
          <Col xs={24} sm={12} lg={6} key={card.path}>
            {/* Оборачиваем Card в Link для навигации */}
            <Link href={card.path} style={{ display: 'block', height: '100%' }}>
              <Card
                hoverable
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
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}