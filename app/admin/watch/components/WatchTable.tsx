'use client'; // Это важно!

import { Table, Space, Button } from "antd";
import Link from "next/link";

export function WatchTable({ data }: { data: any[] }) {
  return (
    <Table dataSource={data} rowKey="id">
      <Table.Column dataIndex="title" title="Название" />
      <Table.Column dataIndex="price" title="Цена" />
      <Table.Column 
        title="Действия" 
        render={(_, record: any) => (
          <Space>
            {/* Теперь этот код выполняется на клиенте, ошибки не будет */}
            <Link href={`/admin/watch/edit/${record.id}`}>Редактировать</Link>
          </Space>
        )} 
      />
    </Table>
  );
}