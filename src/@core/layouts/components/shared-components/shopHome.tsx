// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  shopName: string
}

const ShopHome = (props: Props) => {
  // ** Props
  const { shopName } = props
  const router = useRouter()

  return (
    <IconButton
      color='inherit'
      aria-haspopup='true'
      onClick={() => {
        router.push('/mes-magasin')
      }}
    >
      <Icon icon='fluent:building-shop-24-regular' />
      <Typography>{shopName}</Typography>
    </IconButton>
  )
}

export default ShopHome
