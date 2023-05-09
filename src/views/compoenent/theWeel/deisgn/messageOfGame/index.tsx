import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import React, { MouseEvent, SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import Icon from 'src/@core/components/icon'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addGameRules } from 'src/servicesApi/desgin'
import { useMutation, useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { getShopById } from 'src/servicesApi/shops'

const MessageOfGame = (props: any) => {
  const { open, handleClose } = props
  const [value, setValueTab] = useState<string>('1')
  const { t } = useTranslation('translation')
  const { data, refetch } = useQuery('shop', () => getShopById(window.localStorage.getItem('shopId')))
  useEffect(() => {
    refetch()
  }, [open])
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValueTab(newValue)
  }
  const { control, handleSubmit, setValue, reset } = useForm({})
  const handleReset = () => {
    reset({ message_hello_fr: '' })
    reset({ message_hello_en: '' })
    reset({ message_hello_it: '' })
    reset({ message_hello_ep: '' })
    reset({ message_game_fr: '' })
    reset({ message_game_en: '' })
    reset({ message_game_it: '' })
    reset({ message_game_ep: '' })
    reset({ message_confirm_send_email_fr: '' })
    reset({ message_confirm_send_email_en: '' })
    reset({ message_confirm_send_email_it: '' })
    reset({ message_confirm_send_email_ep: '' })
    reset({ message_lost_fr: '' })
    reset({ message_lost_en: '' })
    reset({ message_lost_it: '' })
    reset({ message_lost_ep: '' })
    reset({ message_gagner_fr: '' })
    reset({ message_gagner_en: '' })
    reset({ message_gagner_it: '' })
    reset({ message_gagner_ep: '' })
  }
  const MessageOfGameMutation = useMutation(addGameRules, {
    onSuccess: () => {
      toast.success('Message updated succefully!')
      handleReset()
      handleClose()
    }
  })

  useEffect(() => {
    if (data) {
      setValue('message_hello_fr', data?.home_page_titre ? JSON.parse(data?.home_page_titre)?.fr : '')
      setValue('message_hello_en', data?.home_page_titre ? JSON.parse(data?.home_page_titre)?.en : '')
      setValue('message_hello_it', data?.home_page_titre ? JSON.parse(data?.home_page_titre)?.it : '')
      setValue('message_hello_ep', data?.home_page_titre ? JSON.parse(data?.home_page_titre)?.ep : '')
      setValue('message_game_fr', data?.page1_texte ? JSON.parse(data?.page1_texte)?.fr : '')
      setValue('message_game_en', data?.page1_texte ? JSON.parse(data?.page1_texte)?.en : '')
      setValue('message_game_it', data?.page1_texte ? JSON.parse(data?.page1_texte)?.it : '')
      setValue('message_game_ep', data?.page1_texte ? JSON.parse(data?.page1_texte)?.ep : '')
      setValue('message_confirm_send_email_fr', data?.page2_texte ? JSON.parse(data?.page2_texte)?.fr : '')
      setValue('message_confirm_send_email_en', data?.page2_texte ? JSON.parse(data?.page2_texte)?.en : '')
      setValue('message_confirm_send_email_it', data?.page2_texte ? JSON.parse(data?.page2_texte)?.it : '')
      setValue('message_confirm_send_email_ep', data?.page2_texte ? JSON.parse(data?.page2_texte)?.ep : '')
      setValue('message_lost_fr', data?.pop_up_perdu ? JSON.parse(data?.pop_up_perdu)?.fr : '')
      setValue('message_lost_en', data?.pop_up_perdu ? JSON.parse(data?.pop_up_perdu)?.en : '')
      setValue('message_lost_it', data?.pop_up_perdu ? JSON.parse(data?.pop_up_perdu)?.it : '')
      setValue('message_lost_ep', data?.pop_up_perdu ? JSON.parse(data?.pop_up_perdu)?.ep : '')
      setValue('message_gagner_fr', data?.pop_up_gagner ? JSON.parse(data?.pop_up_gagner)?.fr : '')
      setValue('message_gagner_en', data?.pop_up_gagner ? JSON.parse(data?.pop_up_gagner)?.en : '')
      setValue('message_gagner_it', data?.pop_up_gagner ? JSON.parse(data?.pop_up_gagner)?.it : '')
      setValue('message_gagner_ep', data?.pop_up_gagner ? JSON.parse(data?.pop_up_gagner)?.ep : '')
    }
  }, [data])
  const onSubmit = async (values: any) => {
    await MessageOfGameMutation.mutateAsync({
      home_page_titre: JSON.stringify({
        fr: values.message_hello_fr,
        en: values.message_hello_en,
        it: values.message_hello_it,
        ep: values.message_hello_ep
      }),
      page1_texte: JSON.stringify({
        fr: values.message_game_fr,
        en: values.message_game_en,
        it: values.message_game_it,
        ep: values.message_game_ep
      }),
      page2_texte: JSON.stringify({
        fr: values.message_confirm_send_email_fr,
        en: values.message_confirm_send_email_en,
        it: values.message_confirm_send_email_it,
        ep: values.message_confirm_send_email_ep
      }),
      pop_up_gagner: JSON.stringify({
        fr: values.message_gagner_fr,
        en: values.message_gagner_en,
        it: values.message_gagner_it,
        ep: values.message_gagner_ep
      }),
      pop_up_perdu: JSON.stringify({
        fr: values.message_lost_fr,
        en: values.message_lost_en,
        it: values.message_lost_it,
        ep: values.message_lost_ep
      })
    })
  }
  return (
    <Dialog
      maxWidth='lg'
      onClose={() => {
        handleReset()
        handleClose()
      }}
      aria-labelledby='customized-dialog-title'
      open={open}
      sx={{ width: '100%' }}
    >
      <DialogTitle id='customized-dialog-title' sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5' component='span'>
          {' '}
          Messages du jeux
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
        <DialogContent dividers sx={{ pb: 10, pl: 10, pr: 10, display: 'flex', flexDirection: 'column' }}>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label='nav tabs example'
              sx={{ display: 'flex', justifyItems: 'flex-start' }}
            >
              <Tab
                value='1'
                component='a'
                label='Français'
                href='/drafts'
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              />
              <Tab
                value='2'
                component='a'
                label='Anglais'
                href='/trash'
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              />
              <Tab
                value='3'
                component='a'
                label='Italien'
                href='/trash'
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              />
              <Tab
                value='4'
                component='a'
                label='Espagnol'
                href='/trash'
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              />
            </TabList>
            <TabPanel value='1'>
              <Grid container spacing={16} sx={{ width: { xs: '90%', md: '100%', lg: '100%' }, pt: 10 }}>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message de bienvenue</Typography>
                    <Controller
                      name='message_hello_fr'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          name='message_hello_fr'
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message gagner</Typography>
                    <Controller
                      name='message_gagner_fr'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          name='message_gagner_fr'
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message Confirmation mail envoyé</Typography>
                    <Controller
                      name='message_confirm_send_email_fr'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          name='message_confirm_send_email_fr'
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message jeux</Typography>
                    <Controller
                      name='message_game_fr'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          name='message_game_fr'
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message perdu</Typography>
                    <Controller
                      name='message_lost_fr'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          name='message_lost_fr'
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='2'>
              <Grid container spacing={16} sx={{ width: { xs: '90%', md: '100%', lg: '100%' }, pt: 10 }}>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message de bienvenue</Typography>
                    <Controller
                      name='message_hello_en'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message gagner</Typography>
                    <Controller
                      name='message_gagner_en'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message Confirmation mail envoyé</Typography>
                    <Controller
                      name='message_confirm_send_email_en'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message jeux</Typography>
                    <Controller
                      name='message_game_en'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message perdu</Typography>
                    <Controller
                      name='message_lost_en'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='3'>
              <Grid container spacing={16} sx={{ width: { xs: '90%', md: '100%', lg: '100%' }, pt: 10 }}>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message de bienvenue</Typography>
                    <Controller
                      name='message_hello_it'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message gagner</Typography>
                    <Controller
                      name='message_gagner_it'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message Confirmation mail envoyé</Typography>
                    <Controller
                      name='message_confirm_send_email_it'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message jeux</Typography>
                    <Controller
                      name='message_game_it'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message perdu</Typography>
                    <Controller
                      name='message_lost_it'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value='4'>
              <Grid container spacing={16} sx={{ width: { xs: '90%', md: '100%', lg: '100%' }, pt: 10 }}>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message de bienvenue</Typography>
                    <Controller
                      name='message_hello_ep'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message gagner</Typography>
                    <Controller
                      name='message_gagner_ep'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message Confirmation mail envoyé</Typography>
                    <Controller
                      name='message_confirm_send_email_ep'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message jeux</Typography>
                    <Controller
                      name='message_game_ep'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ pb: 4, width: '300px' }}>Message perdu</Typography>
                    <Controller
                      name='message_lost_ep'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          maxRows={4}
                          rows={4}
                          multiline
                          id='textarea-outlined-static'
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </DialogContent>
        <DialogActions
          sx={{
            p: theme => `${theme.spacing(3)} !important`,
            display: 'flex',

            flexDirection: 'row'
          }}
        >
          <Button
            onClick={handleClose}
            sx={{ height: 60, padding: 4, margin: 2, minWidth: '200px', fontSize: '20px', fontWeight: '700' }}
          >
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
export default MessageOfGame
