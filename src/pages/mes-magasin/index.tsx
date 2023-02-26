// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getShops } from '../../../servicesApi/shops'
import { Box, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Column {
  id: 'name' | 'pays' | 'adresse' | 'ville' | 'Responsable'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'pays', label: 'pays', minWidth: 100 },
  {
    id: 'adresse',
    label: 'adresse',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'ville',
    label: 'ville',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'Responsable',
    label: 'Responsable',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2)
  }
]

interface Data {
  designiation: string
  adress: string
  ville: number
  pays: number
  responsable: string
}

function createData(designiation: string, adress: string, ville: number, pays: number, responsable: string): Data {
  return { designiation, adress, ville, pays, responsable }
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263, 'India'),
  createData('China', 'CN', 1403500365, 9596961, 'India')
]
const SecondPage = () => {
  const { isLoading, data } = useQuery('shops', () => getShops())

  const shops = data ?? []

  useEffect(() => {}, [shops])
  console.log('shops----', shops.shops[1].responsable)
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
    <>
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h4' sx={{ m: 3 }}>
          {' '}
          Mes Boutiques
        </Typography>
        <Typography variant='h5' sx={{ m: 3 }}>
          Administration / <span style={{ color: 'red' }}>Mes boutiques</span>{' '}
        </Typography>
        <Card>
          <CardHeader
            title='Mes Boutiques 🏬'
            sx={{ fontSize: '24px', pt: 3 }}
            action={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ height: 60, padding: 3, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
                >
                  Ajouter
                </Button>
              </Box>
            }
          ></CardHeader>
          <CardContent>
            <TableContainer component={Paper} sx={{ minHeight: '65vh' }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shops?.shops?.map((row: any) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.pays}</TableCell>
                      <TableCell>{row.addresse}</TableCell>
                      <TableCell>{row.ville}</TableCell>
                      <TableCell>{row.responsable}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
   <ToastContainer
     position="top-right"
     autoClose={3000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
   />
    </>
  )
}

export default SecondPage
