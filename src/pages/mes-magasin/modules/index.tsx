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
import { ChangeEvent, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useUiContext } from 'src/context/uiContext'
import { getModules } from '../../../servicesApi/modules'
import { Box, Button } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Column {
  id: 'module' | 'state' | 'action' | 'dateFinSubscription' | ''
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'module', label: 'Module', minWidth: 170 },
  { id: 'state', label: 'State', minWidth: 170 },
  {
    id: 'dateFinSubscription',
    label: 'Date End Subscription',
    minWidth: 170
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170
  }
]

const ModulePage = () => {
  const { data } = useQuery('modules', () => getModules())
  const { t } = useTranslation('translation')
  const { selectedShop } = useUiContext()
  const modules = data ?? []
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handelSubscription = (state: string, id: any) => {
    const recentState = state ? t('unsubscribe') : t('subscribe')
    console.log('recentState', recentState, id)
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4' sx={{ m: 3 }}>
            {' '}
            {t('modules')} {selectedShop}
          </Typography>
          <Typography variant='h5' sx={{ m: 3 }}>
            Administration / <span style={{ color: 'red' }}>{t('modules')}</span>{' '}
          </Typography>
          <Card>
            <CardHeader
              title={`${t('modules')} 🏬`}
              sx={{ fontSize: '24px', pt: 3 }}
              action={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{ height: 60, padding: 3, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
                  >
                    {t('add')}
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
                    {modules?.modules?.map((row: any) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{row.name || '-'}</TableCell>
                        <TableCell>{row.state || '-'}</TableCell>
                        <TableCell>{row.date || '-'}</TableCell>
                        <TableCell>
                          <Button
                            variant='text'
                            color='secondary'
                            onClick={() => handelSubscription(row.state, row.id)}
                          >
                            {row.state ? t('unsubscribe') : t('subscribe')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={modules?.modules?.length}
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
        position='top-right'
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

export default ModulePage
