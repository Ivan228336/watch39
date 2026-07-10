'use client';

import { Table, Button, Tag, Space } from "antd";
import Link from "next/link";

export function PostTable({ data }: { data: any[] }) {
  const columns = [
    { title: 'Заголовок', dataIndex: 'title', key: 'title' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    {
      title: 'Статус',
      dataIndex: 'published',
      render: (val: boolean) => val ? <Tag color="green">Опубликовано</Tag> : <Tag>Черновик</Tag>
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      render: (val: string) => new Date(val).toLocaleDateString()
    },
    {
      title: 'Действия',
      render: (_: any, record: any) => (
        <Space>
          <Link href={`/admin/post/edit/${record.id}`}>
            <Button size="small">Редактировать</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="id" />;
}