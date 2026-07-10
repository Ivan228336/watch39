'use client';

import { Suspense } from 'react';
import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Space } from "antd";

function CategoryListContent() {
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Название" />
        <Table.Column dataIndex="slug" title="URL (Slug)" />
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

export default function CategoryListPage() {
  return (
    <Suspense fallback={<div>Загрузка списка...</div>}>
      <CategoryListContent />
    </Suspense>
  );
}