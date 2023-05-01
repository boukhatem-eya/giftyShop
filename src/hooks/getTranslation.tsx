import { useTranslation } from 'react-i18next'

export default function Translation(value: string): any {
  const { t } = useTranslation('translation')

  return t(value)
}
