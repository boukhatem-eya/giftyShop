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
// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { ReactNode, SyntheticEvent, useState } from 'react'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import { FormControl, FormHelperText, Tabs } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Select, MenuItem } from "@mui/material";
type props = {
  open: boolean
  handleClose: () => void
}

const AddArticle = (props: props) => {
  // ** State
  const router = useRouter()
  const { open, handleClose } = props

  const CloseAndOpenTheWeel = () => {
    handleClose()
    router.push('/the-heel-game/dashboard')
  }
  const {
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
    // resolver: yupResolver(schema)
  })
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const [activeTab, setActiveTab] = useState(0);


  const handleTabChange = (event: any, newValue:any) => {
    setActiveTab(newValue);
  };
  const onSubmit = (data:any) => {
    console.log(data);
  };
  return (
    <>
      <Dialog
        maxWidth='lg'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={{ width: '100%' }}
      >
        <DialogTitle
          id='customized-dialog-title'
          sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Typography variant='h4' component='span'>
            Nouvelle article
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers sx={{ pb: 10, pl: 10, pr: 10 }}>
          <Box sx={{ p: 4, display: 'flex', alignItems: 'left' }}>
            <Typography variant='h4' component='span' sx={{ p: 0 }}>
              <img src={'/images/Image.svg'} width='200px' />
            </Typography>

            <Typography sx={{ p: 5, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
              <Button
                variant='contained'
                sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
              >
                Télécharger une photos
                <input type='file' hidden name='logo' />
              </Button>

              <Typography sx={{ p: 2 }}>Autorisé png et jpeg , taille maximale de book</Typography>
            </Typography>
          </Box>

          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Informations" />
            <Tab label="Avances" />
          </Tabs>

          <Box sx={{ p: 2 }}>
            {activeTab === 0 && (
              <>
                <TextField {...register("name")} label="Name" />
                <TextField
                  {...register("designation")}
                  label="Designation"
                />
              </>
            )}

            {activeTab === 1 && (
              <>
                <TextField
                  {...register("produitMaximale")}
                  label="Produit Maximale"
                  type="number"
                />
                {/* <DatePicker
                  {...register("disponibleJusqua")}
                  label="Disponible Jusqua"
                  renderInput={(params:any) => (
                    <TextField {...params} fullWidth />
                  )}
                /> */}
              </>
            )}

           
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Button
            // onClick={handleCloseAndOpen}

            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
            cancel
          </Button>
          <Button
            type="submit" 
            variant='contained'
            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
            Submit
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AddArticle
