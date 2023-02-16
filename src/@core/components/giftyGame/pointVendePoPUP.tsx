// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { ReactNode, useState } from 'react'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { he } from 'date-fns/locale'
import PaymentDialog from './stripePopup'

const columns = [
  { field: 'id', headerName: 'disignation', width: 130 },
  { field: 'disignation', headerName: 'disignation', width: 130 },
  { field: 'firstName', headerName: 'Adresse', width: 130 },
  { field: 'lastName', headerName: 'villle', width: 130 },
  {
    field: 'age',
    headerName: 'Responsable',
    width: 130
  },
  {
    field: 'numero',
    headerName: 'numero',
    width: 120
  }
]

const rows = [
  { id: 1, disignation: 'zdefefe', lastName: 'Snow', firstName: 'Jon', age: 'kamle', numero: '1515212' },
  { id: 2, disignation: 'dfedfced', lastName: 'Lannister', firstName: 'Cersei', age: 'raouf', numero: '1515212' },
  { id: 3, disignation: 'dvfdfvdf', lastName: 'Lannister', firstName: 'Jaime', age: 'nesriine', numero: '1515212' }
]

type props = {
  open: boolean
  handleClose: () => void
}

const PointVente = (props: props) => {
  // ** State
  const router = useRouter()

  const [OpenStripe, setOpenStripe] = useState(false)
  const { open, handleClose } = props
  const [selectionModel, setSelectionModel] = useState([])
  const [selections, setSelections] = useState([])
  console.log(selections)
  const handleSelectionModelChange = (newSelection: any) => {
    if (newSelection) {
      const selectedRows = newSelection.map((id: any) => rows.find(row => row.id === id))
      setSelections(selectedRows)
      setSelectionModel(newSelection.selectionModel)
      console.log(selectedRows)
    }
  }
  const onClose = () => setOpenStripe(false)

  const CloseAndOPenStripe = () => {
    handleClose();
    setOpenStripe(true)
  }

  return (
    <>
      <Dialog
        PaperProps={{ sx: { height: '70%' } }}
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={{ width: '100%' }}
      >
        <DialogTitle
          id='customized-dialog-title'
          sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        >
          <img src='/images/giftyGameLogoMOdule.png' width='200px'></img>
          <Typography variant='h6' component='span'></Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant='h5' component='span' sx={{ p: 4, fontWeight: 'bold' }}>
            veillez selectionner le point de vente ou laquelle vous devez ....
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={rows.length}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
            sx={{ width: '100%', mt: 2, height: 'auto' }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`
          }}
        >
          2555$
          <Button variant='contained' onClick={CloseAndOPenStripe} sx={{ height: 50, padding: 4, margin: 2 }}>
            payer
          </Button>
        </DialogActions>
      </Dialog>
      <PaymentDialog open={OpenStripe} onClose={onClose} amount={'500'}/>
    </>
  )
}

export default PointVente
