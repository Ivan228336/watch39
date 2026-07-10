'use client';

import { Suspense } from 'react';
import { List, useTable } from '@refinedev/antd';
import { Table } from 'antd';

// Внутренний компонент, где вызывается хук таблицы
const BrandListContent = () => {
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Название" />
        <Table.Column dataIndex="slug" title="Slug" />
      </Table>
    </List>
  );
};

// Экспортируемый компонент, защищенный Suspense снаружи
export const BrandList = () => {
  return (
    <Suspense fallback={<div>Загрузка списка...</div>}>
      <BrandListContent />
    </Suspense>
  );
};