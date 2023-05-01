// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  // ** Hook
  const { i18n } = useTranslation()
  const { t } = useTranslation('translation')

  // ** Vars
  const { layout } = settings
  const handleChangeLanguage = (value: string) => {
    localStorage.setItem('language', value)
    window.location.reload()
  }

  return (
    <OptionsMenu
      icon={<Icon icon='mdi:translate' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
      iconButtonProps={{ color: 'inherit', sx: { ...(layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }) } }}
      options={[
        {
          text: t('enligsh'),
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => {
              // handleLangItemClick('en')
              handleChangeLanguage('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        {
          text: t('french'),
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'fr',
            onClick: () => {
              // handleLangItemClick('fr')
              handleChangeLanguage('fr')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
