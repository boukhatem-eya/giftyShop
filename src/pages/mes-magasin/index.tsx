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
import Radio from '@mui/material/Radio'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { useState, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { getShops, refreshShops } from '../../servicesApi/shops'
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useMutation } from 'react-query'
import 'react-toastify/dist/ReactToastify.css'
import { useUiContext } from 'src/context/uiContext'
import AddShop from 'src/views/compoenent/firstConnection/AddShop'
import { useRouter } from 'next/router'

interface Column {
  id: 'name' | 'pays' | 'adresse' | 'ville' | 'Responsable' | 'Module' | '' | 'Action'
  label: string
  width?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: '', label: '', width: 100 },
  { id: 'name', label: 'Name', width: 150 },
  { id: 'pays', label: 'pays', width: 150 },
  {
    id: 'adresse',
    label: 'adresse',
    width: 150,
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'ville',
    label: 'ville',
    width: 150,
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'Responsable',
    label: 'Responsable',
    width: 150,
    format: (value: number) => value.toFixed(2)
  },
  {
    id: 'Module',
    label: 'Module',
    width: 150,
    format: (value: number) => value.toFixed(2)
  },
  {
    id: 'Action',
    label: 'Action',
    width: 150,
    format: (value: number) => value.toFixed(2)
  }
]
const SecondPage = () => {
  const { data } = useQuery('shops', () => getShops())
  const [selectedShopId, setSelectedShopId] = useState<any>()
  const [openConfigPopup, setOpenConfigPopup] = useState<boolean>(false)
  const { t } = useTranslation('translation')
  const router = useRouter()
  const { setShop, selectedShop } = useUiContext()
  const shops = data ?? []
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<any>(3)
  const refreshMutation = useMutation(refreshShops, {
    onSuccess: (response: any) => {
      window.localStorage.setItem('accessToken', response.data.token)
      window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
    }
  })
  const handleChange = async (id: any, name: string) => {
    setShop(name)
    window.localStorage.removeItem('selectedShop')
    window.localStorage.setItem('selectedShop', name)
    window.localStorage.setItem('shopId', id)

    await refreshMutation.mutateAsync(id)
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, shops?.shops?.length - page * rowsPerPage)

  const handleClickConfigOpen = () => setOpenConfigPopup(true)

  const handleConfigClose = () => setOpenConfigPopup(false)

  const handleCloseAndOpen = () => {
    handleClickConfigOpen()
  }
  const RowOptions = ({ id }: { id: number | string }) => {
    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleEditShop = () => {
      handleRowOptionsClose()
      setSelectedShopId(id)
      handleClickConfigOpen()
    }
    console.log('selectedShopId', selectedShopId)

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='mdi:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem onClick={handleEditShop} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4' sx={{ m: 3 }}>
            {' '}
            {t('mes-boutiques')}
          </Typography>
          <Typography variant='h5' sx={{ m: 3 }}>
            Administration / <span style={{ color: 'red' }}>{t('mes-boutiques')}</span>{' '}
          </Typography>
          <Card sx={{ height: '80%' }}>
            <CardHeader
              title='Mes Boutiques 🏬'
              sx={{ fontSize: '24px', pt: 3 }}
              action={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    onClick={handleCloseAndOpen}
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
                    {shops?.shops?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Radio
                            value={row.name}
                            onChange={() => handleChange(row.id, row.name)}
                            name='radio-button-demo'
                            checked={
                              selectedShop === row.name || window.localStorage.getItem('selectedShop') === row.name
                            }
                            inputProps={{ 'aria-label': 'A' }}
                          />
                        </TableCell>
                        <TableCell>{row.name || '-'}</TableCell>
                        <TableCell>{row.pays || '-'}</TableCell>
                        <TableCell>{row.adresse || '-'}</TableCell>
                        <TableCell>{row.ville || '-'}</TableCell>
                        <TableCell>{row.responsable || '-'}</TableCell>
                        <TableCell>
                          <Button
                            variant='text'
                            color='secondary'
                            onClick={() => {
                              ;(selectedShop === row.name ||
                                window.localStorage.getItem('selectedShop') === row.name) &&
                                router.push({
                                  pathname: '/mes-magasin/modules',
                                  query: { shopId: row.id }
                                })
                            }}
                          >
                            {' '}
                            {row.module || '0/4'}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <RowOptions id={row?.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && <TableRow style={{ height: 74 * emptyRows }}></TableRow>}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[4]}
                  component='div'
                  count={shops?.shops?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AddShop open={openConfigPopup} handleClose={handleConfigClose} id={selectedShopId} />
    </>
  )
}

export default SecondPage
