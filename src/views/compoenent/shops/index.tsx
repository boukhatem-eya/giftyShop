// ** MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getShops, refreshShops } from '../../../servicesApi/shops'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {
  Card,
  CardContent,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { useUiContext } from 'src/context/uiContext'

interface Column {
  id: 'name' | 'pays' | 'adresse' | 'ville' | 'Responsable' | ''
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
  }
]

type props = {
  open: boolean
  handleClose: () => void
}

const ShopsModal = (props: props) => {
  const { open, handleClose } = props
  const { data } = useQuery('shops', () => getShops())
  const shops = data ?? []
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<any>(3)
  const [shopdata, setShopData] = useState<any>({ name: window.localStorage.getItem('selectedShop') })
  console.log('shopdata', shopdata)
  const { setShop, selectedShop } = useUiContext()
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const refreshMutation = useMutation(refreshShops, {
    onSuccess: (response: any) => {
      window.localStorage.setItem('accessToken', response.data.token)
      window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
      handleClose()
    }
  })
  const handleChange = async (id: any, name: string) => {
    setShopData({ id, name })
    // setShop(name)
  }
  const handleShop = async () => {
    console.log('shopdata.id', shopdata.id)
    setShop(shopdata.name)
    window.localStorage.removeItem('selectedShop')
    window.localStorage.setItem('selectedShop', shopdata.name)
    window.localStorage.setItem('shopId', shopdata.id)

    await refreshMutation.mutateAsync(shopdata.id)
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, shops?.shops?.length - page * rowsPerPage)

  const Close = () => {
    handleClose()
  }

  return (
    <>
      <Dialog
        PaperProps={{ sx: { height: '85%' } }}
        maxWidth='lg'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={{ width: '100%' }}
      >
        <DialogTitle
          id='customized-dialog-title'
          sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        >
          <img src='/images/giftyGameLogoMOdule.png' alt='giftygame' height='100px'></img>
          <Typography variant='h6' component='span'></Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant='h5' component='span' sx={{ pb: 5, width: '70%', textAlign: 'center' }}>
            Veuillez sélectionner votre boutique
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
                    {shops?.shops?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Radio
                            value={row.name}
                            onChange={() => handleChange(row.id, row.name)}
                            name='radio-button-demo'
                            checked={shopdata.name === row.name}
                            inputProps={{ 'aria-label': 'A' }}
                          />
                        </TableCell>
                        <TableCell>{row.name || '-'}</TableCell>
                        <TableCell>{row.pays || '-'}</TableCell>
                        <TableCell>{row.addresse || '-'}</TableCell>
                        <TableCell>{row.ville || '-'}</TableCell>
                        <TableCell>{row.responsable || '-'}</TableCell>
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
          {/* <DataGrid
            rows={data?.shops}
            columns={columns}
            pageSize={data?.shops?.length}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
            sx={{ width: '100%', mt: 2, height: '100%' }}
          /> */}
        </DialogContent>

        <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            onClick={Close}
            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
            Fermer
          </Button>

          <Button
            variant='contained'
            onClick={handleShop}
            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
            Sélectionner
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShopsModal
