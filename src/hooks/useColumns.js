import React from 'react'
import { Link } from 'react-router-dom'
import { Button, FormCheck  } from 'react-bootstrap'

export const useColumns = ({handleChange, checked, handleDelete}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: '',
        id: 'checkbox',
        accessor: ({id}) => (<FormCheck type="checkbox" checked={checked.includes(id)} onChange={() => handleChange(id)} />),
      },
      {
        Header: 'ID',
        id: 'id',
        accessor: 'id'
      },
      {
        Header: '',
        id: 'link',
        accessor: ({id}) => (<Link to={`/users/${id}`}>Подробнее</Link>)
      },
      {
        Header: 'username',
        id: 'username',
        accessor: 'username',
      },
      {
        Header: 'email',
        id: 'email',
        accessor: 'email',
      },
      {
        Header: 'website',
        id: 'website',
        accessor: 'website',
      },
      {
        Header: 'Удалить',
        id: 'delete',
        accessor: ({id}) => (<Button variant="outline-danger" onClick={() => handleDelete(id)}>x</Button>),
      },
    ],
    [checked, handleChange, handleDelete]
  )
  return columns
}
