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

type props = {
  open: boolean
  handleClose: () => void
}

const Stripe = (props: props) => {
  // ** State
  const router = useRouter()
  const { open, handleClose } = props
  const [selectionModel, setSelectionModel] = useState([])

  const handleSelectionModelChange = (newSelection: any) => {
    setSelectionModel(newSelection.selectionModel)
  }

  return (
    <>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button> */}
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
        <DialogContent
          dividers
          sx={{ p: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
        ></DialogContent>
        <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Button variant='contained' sx={{ height: 50, padding: 4, margin: 2 }}>
            payer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Stripe
