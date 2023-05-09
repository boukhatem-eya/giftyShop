import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'

import Icon from 'src/@core/components/icon'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addGameRules } from 'src/servicesApi/desgin'
import { useMutation, useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { getShopById } from 'src/servicesApi/shops'

const MdpEmployer = (props: any) => {
  const { open, handleClose } = props
  const { t } = useTranslation('translation')

  const { data, refetch } = useQuery('shop', () => getShopById(window.localStorage.getItem('shopId')))
  useEffect(() => {
    refetch()
  }, [open])
  const { control, handleSubmit, setValue } = useForm()
  useEffect(() => {
    if (data) {
      setValue('password', data.password)
    }
  }, [data])
  const UpdatePasswordMutation = useMutation(addGameRules, {
    onSuccess: () => {
      toast.success('Password updated succefully!')
      setValue('password', '')
      handleClose()
    }
  })
  const onSubmit = async (values: any) => {
    await UpdatePasswordMutation.mutateAsync({
      password: Number(values.password)
    })
  }
  return (
    <Dialog
      maxWidth='lg'
      onClose={() => {
        setValue('password', '')
        handleClose()
      }}
      aria-labelledby='customized-dialog-title'
      open={open}
      sx={{ width: '100%' }}
    >
      <DialogTitle id='customized-dialog-title' sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5' component='span'>
          {' '}
          Mot de passe scan
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
        <DialogContent dividers sx={{ pb: 10, display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          {' '}
          <Box>
            <Typography sx={{ paddingBottom: 4 }}>Mot de passe scan QR code employé</Typography>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField name='password' type='text' value={value} onChange={onChange} />
              )}
            />
          </Box>
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
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
export default MdpEmployer
