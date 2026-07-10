'use client'; // Обязательно для клиентских компонентов

import { Table, Button, Space } from "antd";
import Link from "next/link";

export function CategoryTable({ data }: { data: any[] }) {
  // Определяем колонки прямо здесь, внутри клиентского компонента
  const columns = [
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'URL (Slug)', dataIndex: 'slug', key: 'slug' },
    {
      title: 'Действия',
      render: (_: any, record: any) => (
        <Space>
          <Link href={`/admin/category/edit/${record.id}`}>
            <Button size="small">Редактировать</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="id" />;
}