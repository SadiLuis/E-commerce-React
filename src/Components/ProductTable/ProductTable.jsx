import React from 'react';
import { useExpanded, useGroupBy, useSortBy, useTable, useGlobalFilter } from 'react-table';
import TableContainer from './TableContainer';
import { GlobalFilter } from './GlobalFilter';



export default function ProductTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, 
    headerGroups, rows, 
    prepareRow, 
    setGlobalFilter,
    state } =
    useTable({ columns, data }, 
        useGroupBy, 
        useGlobalFilter, 
        useSortBy, 
        useExpanded);

const {globalFilter} = state        

  return (
      <TableContainer>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
       
          <table {...getTableProps()}> {/*props de la tabla*/}
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps( column.getSortByToggleProps())}>
        

                {column.render('Header')}
                <span>
                    {column.isSorted ? column.isSortedDesc ? "🔽" : "🔼" : ""}
                </span>
           
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                   { 
                      cell.render('Cell')
                   }
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  
      </TableContainer>
    
  );
}
