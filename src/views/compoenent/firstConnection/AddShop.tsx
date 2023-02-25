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
import BlankLayoutWithAppBar from 'src/@core/layouts/BlankLayoutWithAppBar'
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


type props = {
  open: boolean
  handleClose: () => void
}
const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    adresse: yup.string().required(),
    ville : yup.string().required(),
  })
  

  
  interface FormData {
    name: string
    adresse: string
    ville: string
  }
const AddShop = (props: props) => {
  // ** State
  const router = useRouter()
  const { open, handleClose } = props


  const handleSumbit = () => {
    router.push('/mes-magasin')
    handleClose()
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { name, adresse ,ville } = data
    
  }


  return (
    <>
   <Dialog
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 5 }}>
          <Typography variant='h4' component='span'>
            Nouvelle boutique
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 4, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
       
          <Box sx={{ p: 4, display: 'flex', alignItems: 'left' }}>
            <Typography variant='h4' component='span' sx={{ p: 0 }}>
              <img src='/images/Image.svg' width='200px' />
            </Typography>

            <Typography sx={{ p: 5, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
              <Button onClick={handleSumbit} variant='contained' sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}>
                Télécharger une photos
              </Button>

              <Typography sx={{ p: 2 }}>Autorisé png et jpeg , taille maximale de book</Typography>
            </Typography>
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='name'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    placeholder='sssss'
                  />
                )}
              />
              {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Desegiation ' placeholder='' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Responsable' placeholder='john.doe@email.com' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Adresse' placeholder='john.doe@email.com' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Ville' placeholder='Paris' />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField type='email' label='Pays' placeholder='france' />
              </FormControl>
            </Grid>
          </Grid>
       
        </DialogContent>
        <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`
          }}
        >
          <Button
            type="submit"
            variant='contained'
            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
            Ajouter
          </Button>
        </DialogActions>
        </form>
      </Dialog>

    </>
  )
}

export default AddShop
