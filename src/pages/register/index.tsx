// ** React Imports
import { ReactNode, useState, Fragment, MouseEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { Card, CardContent, Grid } from '@mui/material'

const defaultValues = {
  email: '',
  name: '',
  familyname: '',
  password: '',
  telephone: '',
  terms: false
}
interface FormData {
  email: string
  terms: boolean
  name: string
  familyname: string
  telephone: string
  password: string
}

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))
const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { register } = useAuth()

  const schema = yup.object().shape({
    password: yup.string().min(5).required(),
    name: yup.string().min(3).required(),
    familyname: yup.string().min(3).required(),
    email: yup.string().email().required(),
    telephone: yup.string().required(),
    terms: yup.bool().oneOf([true], 'You must accept the privacy policy & terms')
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, name, familyname, telephone, password } = data
    register({ email, name, familyname, telephone, password }, err => {
      if (err.email) {
        setError('email', {
          type: 'manual',
          message: err.email
        })
      }
      if (err.name) {
        setError('name', {
          type: 'manual',
          message: err.name
        })
      }
    })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1, width: '600px' }}>
        <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/Groupe 1192.png' alt='group' width='150px'></img>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 1.5, fontWeight: 600, letterSpacing: '0.18px' }}>
              {`Welcome to ${themeConfig.templateName}! 👋🏻`}
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        value={value}
                        onBlur={onBlur}
                        label='name'
                        onChange={onChange}
                        placeholder='name'
                        error={Boolean(errors.name)}
                      />
                    )}
                  />
                  {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='familyname'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        value={value}
                        onBlur={onBlur}
                        label='familyname'
                        onChange={onChange}
                        placeholder='familyname'
                        error={Boolean(errors.familyname)}
                      />
                    )}
                  />
                  {errors.familyname && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.familyname.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='telephone'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    label='telephone'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.telephone)}
                    placeholder='dddddd'
                  />
                )}
              />
              {errors.telephone && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.telephone.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    label='Email'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='user@email.com'
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    label='Password'
                    onBlur={onBlur}
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ my: 0 }} error={Boolean(errors.terms)}>
              <Controller
                name='terms'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <FormControlLabel
                      sx={{
                        ...(errors.terms ? { color: 'error.main' } : null),
                        '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                      }}
                      control={
                        <Checkbox
                          checked={value}
                          onChange={onChange}
                          sx={errors.terms ? { color: 'error.main' } : null}
                        />
                      }
                      label={
                        <Fragment>
                          <Typography variant='body2' component='span' sx={{ color: errors.terms ? 'error.main' : '' }}>
                            I agree to{' '}
                          </Typography>
                          <Typography
                            href='/'
                            variant='body2'
                            component={Link}
                            sx={{ color: 'primary.main', textDecoration: 'none' }}
                            onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                          >
                            privacy policy & terms
                          </Typography>
                        </Fragment>
                      }
                    />
                  )
                }}
              />
              {errors.terms && (
                <FormHelperText sx={{ mt: 0, color: 'error.main' }}>{errors.terms.message}</FormHelperText>
              )}
            </FormControl>
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
              <Typography href='/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                Sign in instead
              </Typography>
            </Box>
            <Divider
              sx={{
                '& .MuiDivider-wrapper': { px: 4 },
                mt: theme => `${theme.spacing(5)} !important`,
                mb: theme => `${theme.spacing(7.5)} !important`
              }}
            >
              or
            </Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton
                href='/'
                component={Link}
                sx={{ color: '#497ce2' }}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Icon icon='mdi:facebook' />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                sx={{ color: '#1da1f2' }}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Icon icon='mdi:twitter' />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
              >
                <Icon icon='mdi:github' />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                sx={{ color: '#db4437' }}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Icon icon='mdi:google' />
              </IconButton>
            </Box>
          </form>
        </CardContent>
      </Card>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
