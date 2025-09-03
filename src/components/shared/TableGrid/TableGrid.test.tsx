import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { TableGrid, TableGridColumn } from '.';

type TestData = {
  id: number;
  name: string;
  age: number;
};

const columns: TableGridColumn<TestData>[] = [
  { label: 'ID', span: 2, render: (data) => <span>{data.id}</span> },
  { label: 'Name', span: 5, render: (data) => <span>{data.name}</span> },
  { label: 'Age', span: 3, render: (data) => <span>{data.age}</span> },
];

const data: TestData[] = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Smith', age: 30 },
];

describe('TableGrid component', () => {
  it('renders column headers correctly', () => {
    render(<TableGrid columns={columns} data={data} rowKey="id" />);
    columns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  it('renders data rows correctly', () => {
    render(<TableGrid columns={columns} data={data} rowKey="id" />);
    data.forEach((rowData) => {
      expect(screen.getByText(rowData.id.toString())).toBeInTheDocument();
      expect(screen.getByText(rowData.name)).toBeInTheDocument();
      expect(screen.getByText(rowData.age.toString())).toBeInTheDocument();
    });
  });
});
