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
import React, { MouseEvent, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import Icon from 'src/@core/components/icon'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addGameRules } from 'src/servicesApi/desgin'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'

const MessageOfGame = (props: any) => {
  const { open, handleClose } = props
  const [value, setValue] = useState<string>('1')
  const { t } = useTranslation('translation')
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const { control, handleSubmit } = useForm({})
  const MessageOfGameMutation = useMutation(addGameRules, {
    onSuccess: () => {
      toast.success('Message updated succefully!')
      handleClose()
    }
  })

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
      pop_up_perdu: JSON.stringify({
        fr: values.message_hello_fr,
        en: values.message_hello_en,
        it: values.message_hello_it,
        ep: values.message_hello_ep
      }),
      pop_up_gagner: JSON.stringify({
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
      onClose={handleClose}
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
