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
import { useMutation, useQuery, useQueryClient } from 'react-query'
import router from 'next/router'
import toast from 'react-hot-toast'
import { addGameRules } from 'src/servicesApi/desgin'
import { getShopById } from 'src/servicesApi/shops'

const DesignApplication = (props: any) => {
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
  const { control, handleSubmit, setValue } = useForm()
  useEffect(() => {
    setValue('client_delais', data?.client_delais)
    setValue('one_win', data?.one_win)
    setValue('to_get_gift', data?.to_get_gift)
  }, [data])
  const [image, setImage] = useState<any>({
    homePage: {
      picture: null,
      preview: ''
    },
    perdu: {
      picture: null,
      preview: ''
    },
    logo: {
      picture: null,
      preview: ''
    }
  })

  const handleChangeFile = (e: any, name: string) => {
    if (e.target.files.length && name === 'home') {
      setImage({ ...image, homePage: { picture: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) } })
    } else if (e.target.files.length && name === 'lost') {
      setImage({ ...image, perdu: { picture: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) } })
    } else if (e.target.files.length && name === 'logo') {
      setImage({ ...image, logo: { picture: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) } })
    }
  }
  const hiddenFileInputHome: React.MutableRefObject<any> = React.useRef(null)
  const hiddenFileInputLogo: React.MutableRefObject<any> = React.useRef(null)
  const hiddenFileInputPerdu: React.MutableRefObject<any> = React.useRef(null)
  const handleClickHome = () => {
    if (hiddenFileInputHome?.current) {
      hiddenFileInputHome.current.click()
    }
  }
  const handleClickLogo = () => {
    if (hiddenFileInputLogo?.current) {
      hiddenFileInputLogo.current.click()
    }
  }
  const handleClickPerdu = () => {
    if (hiddenFileInputPerdu?.current) {
      hiddenFileInputPerdu.current.click()
    }
  }
  const AddGameRulesMutation = useMutation(addGameRules, {
    onSuccess: () => {
      toast.success('Rule Game add succefully!')
      handleClose()
    }
  })
  const [base64Image, setBase64Image] = useState<any>({ homePage: '', logo: '', perdu: '' })
  useEffect(() => {
    const fetchImage = async () => {
      if (image.homePage.preview) {
        const response = await fetch(image.homePage.preview)
        const blob = await response.blob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          setBase64Image({ ...base64Image, homePage: reader?.result })
        }
      } else if (image.logo.preview) {
        const response = await fetch(image.logo.preview)
        const blob = await response.blob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          setBase64Image({ ...base64Image, logo: reader?.result })
        }
      } else if (image.perdu.preview) {
        const response = await fetch(image.perdu.preview)
        const blob = await response.blob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          setBase64Image({ ...base64Image, perdu: reader?.result })
        }
      }
    }
    fetchImage()
  }, [image])
  console.log('image', image)
  const onSubmit = async (values: any) => {
    if (value === '1')
      await AddGameRulesMutation.mutateAsync({
        one_win: Number(values.one_win),
        client_delais: Number(values.client_delais),
        to_get_gift: Number(values.to_get_gift)
      })
    else
      await AddGameRulesMutation.mutateAsync({
        home_page_background: {
          title: 'home_page_background',
          src: base64Image?.homePage,
          name: image?.homePage?.picture?.name
        },
        home_page_background_img: base64Image?.homePage,
        home_page_background_mime: image?.homePage?.picture?.type,
        logo_perdu_img: base64Image?.perdu,
        logo_perdu_mime: image?.perdu?.picture?.type,
        logo_img: base64Image?.logo,
        logo_mime: image?.logo?.picture?.type,
        logo: {
          title: 'logo',
          src: base64Image?.logo,
          name: image?.logo?.picture?.name
        },
        logo_perdu: {
          title: 'logo_perdu',
          src: base64Image.perdu,
          name: image?.perdu?.picture?.name
        },
        color_main: values.color_main
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
          Design Application
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
        <DialogContent
          dividers
          sx={{ pb: 10, pl: 10, pr: 10, display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label='nav tabs example'
              sx={{ display: 'flex', justifyItems: 'flex-start' }}
            >
              <Tab
                value='1'
                component='a'
                label='Règle de jeux'
                href='/drafts'
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              />
              <Tab
                value='2'
                component='a'
                label='Design'
                href='/trash'
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              />
            </TabList>
            <TabPanel value='1' sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography>1 gagnent tous les</Typography>
                <Controller
                  name='one_win'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      name='one_win'
                      type='number'
                      value={value}
                      onChange={onChange}
                      sx={{ width: '100px', p: 2 }}
                    />
                  )}
                />
                <Typography>Passages.</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography>Si un joueur perd la prochaine partie dans</Typography>
                <Controller
                  name='client_delais'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      name='client_delais'
                      type='number'
                      value={value}
                      onChange={onChange}
                      sx={{ width: '100px', p: 2 }}
                    />
                  )}
                />
                <Typography>heures.</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography>Si un joueur gagne, il récupère son cadeau dans</Typography>
                <Controller
                  name='to_get_gift'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      name='to_get_gift'
                      type='number'
                      value={value}
                      onChange={onChange}
                      sx={{ width: '100px', p: 2 }}
                    />
                  )}
                />
                <Typography>heures.</Typography>
              </Box>
            </TabPanel>
            <TabPanel value='2' sx={{ width: '100%' }}>
              <Grid container spacing={8} sx={{ width: { xs: '90%', md: '100%', lg: '100%' }, pt: 10 }}>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Box sx={{ pr: 4, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                      <Typography variant='h6' component='span' sx={{ p: 0 }}>
                        {t('logo')}
                      </Typography>
                      <Box sx={{ pr: 4, display: 'flex', alignItems: 'left', flexDirection: 'row' }}>
                        <Typography variant='h6' component='span' sx={{ p: 0 }}>
                          <img
                            src={image?.logo?.preview ? image?.logo?.preview : '/images/Image.svg'}
                            alt='logoShop'
                            width='200px'
                            height='180px'
                          />
                        </Typography>

                        <Typography sx={{ p: 5, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                          <Button
                            variant='contained'
                            sx={{
                              height: 60,
                              padding: 4,
                              margin: 2,
                              width: '210px',
                              fontSize: '20px',
                              fontWeight: '700'
                            }}
                            onClick={handleClickLogo}
                          >
                            {t('upload-image')}
                            <input
                              type='file'
                              style={{ display: 'none' }}
                              ref={hiddenFileInputLogo}
                              name='logo'
                              onChange={e => handleChangeFile(e, 'logo')}
                            />
                          </Button>

                          <Typography sx={{ p: 2 }}>{t('autorized-file')}</Typography>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Box sx={{ pr: 4, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                      <Typography variant='h6' component='span' sx={{ p: 0 }}>
                        {t('background')}
                      </Typography>
                      <Box sx={{ pr: 4, display: 'flex', alignItems: 'left', flexDirection: 'row' }}>
                        <Typography variant='h6' component='span' sx={{ p: 0 }}>
                          <img
                            src={image?.homePage?.preview ? image?.homePage?.preview : '/images/Image.svg'}
                            alt='logoShop'
                            width='200px'
                            height='180px'
                          />
                        </Typography>

                        <Typography sx={{ p: 5, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                          <Button
                            variant='contained'
                            sx={{
                              height: 60,
                              padding: 4,
                              margin: 2,
                              width: '210px',
                              fontSize: '20px',
                              fontWeight: '700'
                            }}
                            onClick={handleClickHome}
                          >
                            {t('upload-image')}
                            <input
                              type='file'
                              style={{ display: 'none' }}
                              ref={hiddenFileInputHome}
                              name='logo'
                              onChange={e => handleChangeFile(e, 'home')}
                            />
                          </Button>

                          <Typography sx={{ p: 2 }}>{t('autorized-file')}</Typography>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Box sx={{ pr: 4, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                      <Typography variant='h6' component='span' sx={{ p: 0 }}>
                        {t('picture-lost')}
                      </Typography>
                      <Box sx={{ pr: 4, display: 'flex', alignItems: 'left', flexDirection: 'row' }}>
                        <Typography variant='h6' component='span' sx={{ p: 0 }}>
                          <img
                            src={image?.perdu?.preview ? image?.perdu?.preview : '/images/Image.svg'}
                            alt='logoShop'
                            width='200px'
                            height='180px'
                          />
                        </Typography>

                        <Typography sx={{ p: 5, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                          <Button
                            variant='contained'
                            sx={{
                              height: 60,
                              padding: 4,
                              margin: 2,
                              width: '210px',
                              fontSize: '20px',
                              fontWeight: '700'
                            }}
                            onClick={handleClickPerdu}
                          >
                            {t('upload-image')}
                            <input
                              type='file'
                              style={{ display: 'none' }}
                              ref={hiddenFileInputPerdu}
                              name='logo'
                              onChange={e => handleChangeFile(e, 'lost')}
                            />
                          </Button>

                          <Typography sx={{ p: 2 }}>{t('autorized-file')}</Typography>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box>
                    <Box sx={{ pr: 4, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                      <Typography variant='h6' component='span' sx={{ pb: 5 }}>
                        {t('main-color')}
                      </Typography>
                      <Controller
                        name='color_main'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            name='color_main'
                            type='color'
                            InputLabelProps={{
                              shrink: true
                            }}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </Box>
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
export default DesignApplication
