'use client';

import { Suspense } from 'react';
import { List, useTable, EditButton, BooleanField } from "@refinedev/antd";
import { Table, Space } from "antd";

// 1. Внутренний компонент таблицы
function WatchListContent() {
  const { tableProps } = useTable({
    resource: "watch",
  });

  return (
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
  );
}

// 2. Главная страница списка
export default function WatchListPage() {
  return (
    <Suspense fallback={<div>Загрузка списка часов...</div>}>
      <WatchListContent />
    </Suspense>
  );
}