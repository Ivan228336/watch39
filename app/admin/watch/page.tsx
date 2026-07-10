// app/admin/watch/page.tsx
'use client';

import { Suspense } from 'react';
import { List, useTable, EditButton, BooleanField } from "@refinedev/antd";
import { Table, Space } from "antd";

export default function WatchListPage() {
  const { tableProps } = useTable({
    // Опционально: можно добавить связи для отображения названий брендов, 
    // но для начала выведем базовые поля для скорости
    resource: "watch",
  });

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
        <List>
        <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="modelCode" title="Код модели" />
            <Table.Column dataIndex="title" title="Название" />
            <Table.Column dataIndex="price" title="Цена (₽)" />
            <Table.Column 
            dataIndex="inStock" 
            title="В наличии" 
            render={(value) => <BooleanField value={value} />}
            />
            <Table.Column 
            title="Действия" 
            render={(_, record: any) => (
                <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                </Space>
            )} 
            />
        </Table>
        </List>
    </Suspense>
    
  );
}