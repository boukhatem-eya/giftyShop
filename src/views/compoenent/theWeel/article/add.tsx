// ** MUI Imports
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { addProduct } from 'src/servicesApi/products'

import React, { useEffect, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import { toast } from 'react-toastify'

type props = {
  open: boolean
  handleClose: () => void
  id: any
}

const AddArticle = (props: props) => {
  // ** State
  const router = useRouter()
  const queryClient = useQueryClient()
  const { open, handleClose } = props
  const { t } = useTranslation('translation')

  const { control, handleSubmit, watch } = useForm({})

  const [image, setImage] = useState<{ preview: string; picture: File | null }>({
    picture: null,
    preview: ''
  })

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
  const AddProductMutation = useMutation(addProduct, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries('products')
      router.push('/the-heel-game/article')
      toast.success('Product add succefully!')
      handleClose()
    }
  })
  const onSubmit = async (data: any) => {
    const dataToSave = {
      name: data.designation
      // image: base64Image,
      // image_mime: image?.picture?.type || '',
      // stock: Number(data.limitStock),
      // disponible: '',
      // porductbyday: Number(data.limitProduct),
      // state: '',
      // archive: false,
      // can_win: data.ProductLimit,
      // can_win_time_to: data.startDate,
      // can_win_time_from: data.endDate
    }
    await AddProductMutation.mutateAsync({ dataToSave })
  }

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
            <Box sx={{ pr: 4, display: 'flex', alignItems: 'left' }}>
              <Typography variant='h4' component='span' sx={{ p: 0 }}>
                <img
                  src={image?.preview ? image?.preview : '/images/Image.svg'}
                  alt='logoShop'
                  width='200px'
                  height='180px'
                />
              </Typography>

              <Typography sx={{ p: 5, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                <Button
                  variant='contained'
                  sx={{ height: 60, padding: 4, margin: 2, width: '210px', fontSize: '20px', fontWeight: '700' }}
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
            <Controller
              name='designation'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label='Designation'
                  name='designation'
                  value={value}
                  onChange={onChange}
                  type='text'
                  style={{ width: '400px' }}
                />
              )}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                paddingTop: '15px'
              }}
            >
              {' '}
              <Typography sx={{ p: 2, color: 'red', fontWeight: '500' }}>Produit limité</Typography>
              <Controller
                name='ProductLimit'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    {' '}
                    <FormGroup row>
                      <FormControlLabel control={<Switch />} label='' value={value} onChange={onChange} />
                    </FormGroup>
                  </>
                )}
              />
              {watch('ProductLimit') && (
                <>
                  <Typography variant='subtitle2'>Produit maximum à ganger par personne</Typography>
                  <Controller
                    name='limitProduct'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        name='limitProduct'
                        type='number'
                        sx={{ marginLeft: '20px', width: '100px' }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
              {' '}
              <Typography sx={{ p: 2, color: 'red', fontWeight: '500' }}>Stock limité</Typography>
              <Controller
                name='stockLimit'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    {' '}
                    <FormGroup row>
                      <FormControlLabel control={<Switch />} label='' value={value} onChange={onChange} />
                    </FormGroup>
                  </>
                )}
              />
              {watch('stockLimit') && (
                <>
                  <Typography variant='subtitle2'>Stock produit</Typography>
                  <Controller
                    name='limitStock'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        name='limitStock'
                        type='number'
                        sx={{ marginLeft: '20px', width: '100px' }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: '10px'
              }}
            >
              {' '}
              <Typography sx={{ p: 2, color: 'red', fontWeight: '500' }}>Date limité</Typography>
              <Controller
                name='dateLimit'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <>
                    {' '}
                    <FormGroup row>
                      <FormControlLabel control={<Switch />} label='' value={value} onChange={onChange} />
                    </FormGroup>
                  </>
                )}
              />
              {watch('dateLimit') && (
                <>
                  <div style={{ width: '160px', marginLeft: '20px' }}>
                    <Controller
                      name='startDate'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker label='Disponible de' value={value} onChange={onChange} />
                      )}
                    />
                  </div>
                  <div style={{ width: '160px', marginLeft: '20px' }}>
                    <Controller
                      name='endDate'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker label={`Jusqu'à`} value={value} onChange={onChange} />
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          </DialogContent>
          <DialogActions
            sx={{
              p: theme => `${theme.spacing(3)} !important`,
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Button sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}>
              cancel
            </Button>
            <Button
              type='submit'
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
