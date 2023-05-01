// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ModuleHome = () => {
  const router = useRouter()

  return (
    <IconButton
      color='inherit'
      aria-haspopup='true'
      onClick={() => {
        router.push('/home')
      }}
    >
      <Icon icon='ic:outline-home' />
    </IconButton>
  )
}

export default ModuleHome
