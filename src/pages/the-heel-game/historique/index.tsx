import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'

import { useState } from 'react'
import { useQuery } from 'react-query'

import { getHistory } from 'src/servicesApi/history'

interface Column {
  id: 'designation' | 'image' | 'produit' | 'stock' | 'disponibilite' | 'special' | 'etat' | 'action'
  label: string
  width?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'designation', label: 'Désignation', width: 100 },
  { id: 'image', label: 'Image', width: 150 },
  { id: 'produit', label: 'Produit', width: 150 },
  {
    id: 'stock',
    label: 'Stock',
    width: 150
  },
  {
    id: 'disponibilite',
    label: 'Disponibilité',
    width: 150
  },
  {
    id: 'special',
    label: 'Special',
    width: 150
  },
  {
    id: 'etat',
    label: 'Etat',
    width: 150
  },
  {
    id: 'action',
    label: 'Action',
    width: 150
  }
]

const CLients = () => {
  const { data } = useQuery('history', () => getHistory())
  const history = data ?? []
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<any>(3)
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, history?.length - page * rowsPerPage)

  return (
    <>
      <Typography variant='h4'>Historique</Typography>
      <Typography variant='h5'>
        {' '}
        The Wheel / <span style={{ color: 'red' }}>Historique</span>{' '}
      </Typography>
      <Card sx={{ height: '80%' }}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ width: column.width }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {history?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.name || '-'}</TableCell>
                    <TableCell>{row.produit || '-'}</TableCell>
                    <TableCell>{row.stock || '-'}</TableCell>
                    <TableCell>{row.disponibilte || '-'}</TableCell>
                    <TableCell>{row.etat || '-'}</TableCell>
                    <TableCell>{row.special || '-'}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && <TableRow style={{ height: 74 * emptyRows }}></TableRow>}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[4]}
              component='div'
              count={history?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default CLients
