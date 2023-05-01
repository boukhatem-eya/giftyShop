// ** MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getShops } from '../../../servicesApi/shops'
import { getMount } from 'src/utils/getMount'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { DataGrid } from '@mui/x-data-grid'
import StripeModal from './stripeModal'

const columns = [
  { field: 'desigination', headerName: 'Disignation', width: 190 },
  { field: 'adresse', headerName: 'Adresse', width: 190 },
  { field: 'ville', headerName: 'Ville', width: 190 },
  {
    field: 'responsable',
    headerName: 'Responsable',
    width: 190
  },
  {
    field: 'responsable_email',
    headerName: 'Email',
    width: 190
  }
]

type props = {
  open: boolean
  type: string | undefined
  handleClose: () => void
}

const PointVente = (props: props) => {
  // ** State
  const [OpenStripe, setOpenStripe] = useState(false)
  const { open, handleClose, type } = props
  const [selectionModel, setSelectionModel] = useState([])
  const [selections, setSelections] = useState([])
  const { data } = useQuery('shops', () => getShops())
  type ObjectKey = keyof typeof getMount
  const typeAbonnement = type as ObjectKey

  const handleSelectionModelChange = (newSelection: any) => {
    if (newSelection) {
      const selectedRows = newSelection.map((id: any) => data?.shops?.find((row: any) => row.id === id))
      setSelections(selectedRows)
      setSelectionModel(newSelection)
    }
  }
  const onClose = () => setOpenStripe(false)

  const CloseAndOPenStripe = () => {
    handleClose()
    setOpenStripe(true)
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
            Veuillez séléctionner les points de ventes dans lesquelles vous souhaitez activer ce module
          </Typography>
          <DataGrid
            rows={data?.shops}
            columns={columns}
            pageSize={data?.shops?.length}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
            sx={{ width: '100%', mt: 2, height: '100%' }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`
          }}
        >
          <Typography variant='h6' component='span' sx={{ padding: 4 }}>
            Total 2555$/ans
          </Typography>

          <Button
            variant='contained'
            onClick={CloseAndOPenStripe}
            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
            Payer
          </Button>
        </DialogActions>
      </Dialog>
      <StripeModal
        open={OpenStripe}
        onClose={onClose}
        amount={getMount[typeAbonnement]}
        type={typeAbonnement}
        selections={selections}
      />
    </>
  )
}

export default PointVente
