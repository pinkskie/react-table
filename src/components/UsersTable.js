import React, { useCallback, useEffect, useState } from 'react'
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import { Table } from 'react-bootstrap'
import { useColumns } from '../hooks/useColumns'
import Pagination from './Pagination'
import GlobalSearch from './GlobalSearch'
import styles from './UsersTable.module.scss'
 
function UsersTable() {
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState([]);
  
  useEffect(() => {
    const getUsers = async () => {
      const user = await fetch('https://jsonplaceholder.typicode.com/users')
      const res = await user.json()
      if (res.length) {
        setUsers(res)
        setChecked(res.map(item => item.id))
      }
    }
    getUsers()
  }, [])

  const handleDelete = useCallback((id) => {
    setUsers(users => users.filter(item => item.id !== id))
  }, [])

  const handleChange = useCallback((id) => {
    if (checked.length === 1){
      return 
    }
    setChecked(list => {
      if (list.includes(id)) {
        return list.filter(item => item !== id )
      } else {
        return [...list, id]
      }
    })
  }, [checked.length]);

  const columns = useColumns({ handleChange, handleDelete, checked });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { globalFilter,pageIndex },
    setGlobalFilter,
    prepareRow,
  } = useTable(
    { columns, data: users, initialState: { pageSize: 5 }}, 
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <div className={styles.wrapper}>
      <GlobalSearch filter={globalFilter} setFilter={setGlobalFilter} />
      <Table striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                  </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                    <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"/>
                    <path fill-rule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"/>
                    <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </svg>) : ' ' }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Pagination
        className={styles.tableFooter} 
        nextPage={nextPage} 
        previousPage={previousPage} 
        canNextPage={canNextPage} 
        canPreviousPage={canPreviousPage} 
        pageOptions={pageOptions}
        pageIndex={pageIndex}
      />
    </div>
  )
}

export default UsersTable;
