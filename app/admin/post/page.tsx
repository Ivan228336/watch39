// app/admin/post/page.tsx
'use client';

import { List, useTable, EditButton, DateField, BooleanField } from "@refinedev/antd";
import { Table, Space } from "antd";

export default function PostListPage() {
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Заголовок" />
        <Table.Column dataIndex="slug" title="Slug" />
        <Table.Column 
          dataIndex="published" 
          title="Опубликовано" 
          render={(value) => <BooleanField value={value} />}
        />
        <Table.Column 
          dataIndex="createdAt" 
          title="Дата создания" 
          render={(value) => <DateField value={value} format="DD.MM.YYYY" />}
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