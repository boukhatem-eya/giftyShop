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
import { useMutation, useQueryClient } from 'react-query'
import { addShop } from 'servicesApi/shops'
import { convertFileToBase64 } from 'src/utils/convertFile'
import { toast } from 'react-toastify'
type props = {
  open: boolean
  handleClose: () => void
}
const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  desigination : yup.string().required('desigination is required'),
  adresse: yup.string().required('adresse is required'),
  ville: yup.string().required('desigination is required'),
  responsable: yup.string().required('responsable is required'),
  pays: yup.string().required('pays is required')
})

interface FormData {
  name: string
  desigination: string
  adresse: string
  ville: string
  responsable: string
  pays: string
  logo: any
}
const AddShop = (props: props) => {
  // ** State
  const router = useRouter()
  const { open, handleClose } = props
  const [image, setImage] = useState()
  const queryClient = useQueryClient()

  const {
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const UploadImage = (e: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setImage(reader.result)
    }

    reader.onerror = () => {
      console.log(reader.error)
    }
  }

  // ** Add shop with react query
  const AddShopMutation = useMutation(addShop, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('shops')
      router.push('/mes-magasin')
      toast.success("shop add succefully!")
      handleClose()
    }
  })

  const onSubmit = async (data: FormData) => {
    console.log(data.logo)
    // if (data.logo) {
    //   const picture64 = await convertFileToBase64(data.logo)
    //   const logo = { src: picture64, title: `${data.logo.rawFile.name}` }
    // }
    // edit data
    const { desigination ,name, adresse, ville, responsable, pays , logo  } = data
    await AddShopMutation.mutateAsync({ data })
  }

  return (
    <>
      <Dialog maxWidth='md' onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
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
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ p: 4, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
            <Box sx={{ p: 4, display: 'flex', alignItems: 'left' }}>
              <Typography variant='h4' component='span' sx={{ p: 0 }}>
                <img src={image ? image : '/images/Image.svg'} width='200px' />
              </Typography>

              <Typography sx={{ p: 5, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                <Button
                  variant='contained'
                  sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
                >
                  Télécharger une photos
                  <input type='file' {...register('logo')} hidden name='logo' onChange={UploadImage} />
                </Button>

                <Typography sx={{ p: 2 }}>Autorisé png et jpeg , taille maximale de book</Typography>
              </Typography>
            </Box>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='desigination'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label='Desigination'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.desigination)}
                        placeholder='sssss'
                      />
                    )}
                  />
                  {errors.desigination && <FormHelperText sx={{ color: 'error.main' }}>{errors.desigination.message}</FormHelperText>}
                </FormControl>
              </Grid>
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
                  <Controller
                    name='adresse'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label='Adresse'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.adresse)}
                        placeholder='sssss'
                      />
                    )}
                  />
                  {errors.adresse && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.adresse.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='ville'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label='Ville'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.ville)}
                        placeholder='sssss'
                      />
                    )}
                  />
                  {errors.ville && <FormHelperText sx={{ color: 'error.main' }}>{errors.ville.message}</FormHelperText>}
                </FormControl>
              </Grid>
             
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='responsable'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label='Responsable'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.responsable)}
                        placeholder='sssss'
                      />
                    )}
                  />
                  {errors.responsable && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.responsable.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='pays'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label='Pays'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.pays)}
                        placeholder='sssss'
                      />
                    )}
                  />
                  {errors.pays && <FormHelperText sx={{ color: 'error.main' }}>{errors.pays.message}</FormHelperText>}
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
              type='submit'
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
