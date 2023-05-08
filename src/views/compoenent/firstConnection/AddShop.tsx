// ** MUI Imports
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import React, { useEffect, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { addShop, getShopById, EditShop } from 'src/servicesApi/shops'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

type props = {
  open: boolean
  handleClose: () => void
  id: string
}
interface FormData {
  name: string
  desigination: string
  adresse: string
  ville: string
  responsable: string
  pays: string
  logo: any
  email: string
}
const AddShop = (props: props) => {
  // ** State
  const { open, handleClose, id } = props
  console.log('id', id)

  const { refetch, data } = useQuery('shop', () => getShopById(id), {
    enabled: false
  })

  const router = useRouter()

  const { t } = useTranslation('translation')
  const schema = yup.object().shape({
    ville: yup.string().required('Ville is required'),
    name: yup.string().required('Desigination is required'),
    adresse: yup.string().required('Adresse is required'),
    email: yup
      .string()
      .required(`${t('empty-email')}`)
      .email(`${t('invalid email')}`),
    responsable: yup.string().required('Responsable is required'),
    pays: yup.string().required('Pays is required')
  })
  const [image, setImage] = useState<{ preview: string; picture: File | null }>({
    picture: null,
    preview: ''
  })
  const queryClient = useQueryClient()
  useEffect(() => {
    if (data)
      setImage({
        picture: null,
        preview: data?.image || ''
      })
  }, [data])
  const handleChangeFile = (e: any) => {
    if (e.target.files.length) {
      setImage({
        picture: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0])
      })
    }
  }
  const hiddenFileInput: React.MutableRefObject<any> = React.useRef(null)
  const handleClick = () => {
    if (hiddenFileInput?.current) {
      hiddenFileInput.current.click()
    }
  }
  const [base64Image, setBase64Image] = useState<any>('')

  useEffect(() => {
    if (id) refetch()
  }, [id, refetch])
  useEffect(() => {
    const fetchImage = async () => {
      if (image.preview) {
        const response = await fetch(image.preview)
        const blob = await response.blob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          setBase64Image(reader?.result)
        }
      }
    }
    fetchImage()
  }, [image.preview])
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    defaultValues: {
      adresse: data?.shop?.adresse || '',
      email: data?.shop?.adresse || '',
      name: data ? data?.name : '',
      pays: data?.shop?.adresse || '',
      responsable: data?.shop?.adresse || '',
      ville: data?.shop?.adresse || ''
    },
    resolver: yupResolver(schema)
  })
  useEffect(() => {
    if (data && id) {
      setValue('name', data.name)
    }
  }, [data])
  // ** Add shop with react query
  const AddShopMutation = useMutation(addShop, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('shops')
      router.push('/mes-magasin')
      toast.success('shop add succefully!')
      handleClose()
    }
  })
  const UpdateShopMutation = useMutation(EditShop, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('shops')
      router.push('/mes-magasin')
      toast.success('Shop updated succefully!')
      handleClose()
    }
  })
  const onSubmit = async (data: FormData) => {
    if (!id) await AddShopMutation.mutateAsync({ ...data, logo: base64Image })
    else await UpdateShopMutation.mutateAsync({ ...data, logo: base64Image, id })
  }

  return (
    <>
      <Dialog maxWidth='md' onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle id='customized-dialog-title' sx={{ p: 5 }}>
          <Typography variant='h4' component='span'>
            {t('new-shop')}
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
                <img
                  src={image?.preview ? image?.preview : '/images/Image.svg'}
                  alt='logoShop'
                  width='200px'
                  height='200px'
                />
              </Typography>

              <Typography sx={{ p: 5, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                <Button
                  variant='contained'
                  sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
                  onClick={handleClick}
                >
                  {t('upload-image')}
                  <input
                    type='file'
                    style={{ display: 'none' }}
                    ref={hiddenFileInput}
                    name='logo'
                    onChange={handleChangeFile}
                  />
                </Button>

                <Typography sx={{ p: 2 }}>{t('autorized-file')}</Typography>
              </Typography>
            </Box>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, ref } }) => (
                      <TextField
                        name='name'
                        label='Desigination'
                        value={value}
                        onChange={onChange}
                        inputRef={ref}
                        error={Boolean(errors.desigination)}
                        placeholder='Desigination boutique'
                      />
                    )}
                  />
                  {errors.desigination && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.desigination.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='responsable'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, ref } }) => (
                      <TextField
                        name='responsable'
                        label='Responsable'
                        value={value}
                        onChange={onChange}
                        inputRef={ref}
                        error={Boolean(errors.name)}
                        placeholder='Responsable'
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
                    name='adresse'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        label='Adresse'
                        name='adresse'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.adresse)}
                        placeholder='Adresse'
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
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        label='Ville'
                        name='ville'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.ville)}
                        placeholder='Ville'
                      />
                    )}
                  />
                  {errors.ville && <FormHelperText sx={{ color: 'error.main' }}>{errors.ville.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='pays'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        label='Pays'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.pays)}
                        placeholder='Pays'
                      />
                    )}
                  />
                  {errors.pays && <FormHelperText sx={{ color: 'error.main' }}>{errors.pays.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        name='email'
                        label='Email'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.responsable)}
                        placeholder='Email responsable boutique '
                      />
                    )}
                  />
                  {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
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
              color='secondary'
              variant='contained'
              sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
            >
              {' '}
              {t('return')}
            </Button>
            <Button
              type='submit'
              variant='contained'
              sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AddShop
