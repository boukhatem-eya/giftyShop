import React, { useEffect, useMemo, useState } from 'react'
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js'
import axios from 'axios'
import useResponsiveFontSize from './useResponsiveFontSize'
import { useForm, Controller } from 'react-hook-form'
import { FormControl, TextField, Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import SuccessPayment from './successPayment'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'

const useOptions = () => {
  const fontSize = useResponsiveFontSize()
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          letterSpacing: '0.025em',
          fontFamily: 'Roboto, Source Code Pro, monospace, SFUIDisplay',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#9e2146'
        }
      }
    }),
    [fontSize]
  )

  return options
}

const SplitForm = (details: any) => {
  const { t } = useTranslation('translation')
  const [checkoutError, setCheckoutError] = useState<any>()
  const [paymentStatus, setPaymentStatus] = useState('')
  const [checked, setChecked] = useState<boolean>(true)
  const [OpenSuccess, setOpenSuccess] = useState(false)
  const handleChange = (event: any) => {
    setChecked(event.target.checked)
  }
  const { control, handleSubmit } = useForm()
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()

  const handleCardDetailsChange = (event: any) => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError('')
  }
  const onClose = () => setOpenSuccess(false)
  useEffect(() => {
    if (checkoutError) toast.error(checkoutError, { duration: 2000 })
  }, [checkoutError])
  const closeAndOpenSuccess = () => {
    // details.handleClose()
    setOpenSuccess(true)
  }
  const createSubscription = async (values: any) => {
    try {
      if (!checkoutError) {
        const cardElement = elements?.getElement(CardNumberElement)
        if (cardElement) {
          const paymentMethod = await stripe?.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
              name: values?.name,
              email: values?.email
            }
          })

          setPaymentStatus('processing')
          if (paymentMethod?.error) {
            setPaymentStatus('error')
          } else {
            setPaymentStatus('processing')
            const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
            const config = {
              headers: {
                Authorization: storedToken
              }
            }

            const response = await axios.post(
              'http://testapi.giftyshop.pro/ui/stripe/shop/create_subscription',
              {
                shop_id: details.details.shopIds[0],
                name: values?.name,
                email: values?.email,
                paymentMethod: paymentMethod?.paymentMethod?.id,
                priceId: details.details.amount
              },
              config
            )
            const confirmPayment = await stripe?.confirmCardPayment(response.data.clientSecret)

            if (confirmPayment?.error) {
              setPaymentStatus('error')
            } else {
              setPaymentStatus('processing')
              const response = await axios.post(
                'http://testapi.giftyshop.pro/ui/stripe/shop/payment_save',
                {
                  shop_id: details.details.shopIds[0],
                  month_yearly: details.details.type,
                  value: confirmPayment?.paymentIntent.amount,
                  clientSecret: confirmPayment?.paymentIntent.client_secret
                },
                config
              )

              if (response?.data.updated === true) {
                closeAndOpenSuccess()
              }
            }
          }
        }
      } else {
        toast.error(checkoutError, { duration: 2000 })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(createSubscription)}>
        <Typography variant='subtitle1' component='span'>
          {t('contact-details')}
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, ref } }) => (
                  <TextField
                    name='email'
                    label='Email'
                    value={value}
                    onChange={onChange}
                    inputRef={ref}
                    placeholder='Email'
                    style={{ height: '45px' }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, ref } }) => (
                  <TextField
                    name='namme'
                    label='Name'
                    value={value}
                    onChange={onChange}
                    inputRef={ref}
                    placeholder='Name'
                    style={{ height: '45px' }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='phone-number'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <PhoneInput
                    country={'us'}
                    value={value}
                    onChange={onChange}
                    inputStyle={{
                      width: '100%',
                      height: '53px',
                      borderRadius: '8px',
                      boxSizing: 'border-box'
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <div style={{ marginTop: '10px' }}>
          <Typography variant='subtitle1' component='span'>
            {t('means-of-payment')}
          </Typography>
        </div>
        <Typography variant='subtitle2' component='span'>
          {t('card-information')}
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <label>
                <Typography variant='overline' component='span' color={'#121576'}>
                  {t('card-number')}
                </Typography>
                <CardNumberElement options={options} onChange={handleCardDetailsChange} />
              </label>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <label>
                <Typography variant='overline' component='span' color={'#121576'}>
                  {t('cvc')}
                </Typography>
                <CardCvcElement options={options} onChange={handleCardDetailsChange} />
              </label>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <label>
                <Typography variant='overline' component='span' color={'#121576'}>
                  {t('expiration-date')}
                </Typography>

                <CardExpiryElement options={options} onChange={handleCardDetailsChange} />
              </label>
            </FormControl>
          </Grid>
          {/* {!checkoutError && <CheckoutError>{checkoutError}</CheckoutError>} */}
          <Grid item xs={12}>
            <FormControlLabel
              label={`J'accepte les Conditions d'utilisation du service`}
              control={<Checkbox name='color-primary' checked={checked} onChange={handleChange} />}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginTop: '-10px' }}
          >
            <Button onClick={details.handleClose} disabled={paymentStatus === 'processing'}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit' disabled={paymentStatus === 'processing'}>
              {paymentStatus === 'processing' ? 'Processing...' : 'Pay now'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <SuccessPayment open={OpenSuccess} onClose={onClose} />
    </>
  )
}

export default SplitForm
