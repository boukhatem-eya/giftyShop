// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import ShopHome from 'src/@core/layouts/components/shared-components/shopHome'
import ModuleHome from 'src/@core/layouts/components/shared-components/modulehome'

// ** Components
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { useUiContext } from 'src/context/uiContext'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}
const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const { selectedShop } = useUiContext()
  const { t } = useTranslation('translation')

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ShopHome shopName={selectedShop || window.localStorage.getItem('selectedShop') || t('shop')} />
        <ModuleHome />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
