// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import ShopsModal from 'src/views/compoenent/shops'

interface Props {
  shopName: string
}

const ShopHome = (props: Props) => {
  // ** Props
  const [openSelectShop, setOpenSelectShop] = useState<boolean>(false)
  const { shopName } = props
  const router = useRouter()
  const handleCloseSelectShop = () => {
    setOpenSelectShop(false)
  }

  return (
    <>
      <IconButton color='inherit' aria-haspopup='true' onClick={() => setOpenSelectShop(true)}>
        <Icon icon='fluent:building-shop-24-regular' />
        <Typography>{shopName}</Typography>
      </IconButton>
      <ShopsModal open={openSelectShop} handleClose={handleCloseSelectShop} />
    </>
  )
}

export default ShopHome
