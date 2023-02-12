// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [

  {
    title: 'Boutiques',
    path: '/second-page',
    icon: 'mdi:email-outline',
  },
  {
    title: 'Boutiques',
    path: '/second-page',
    icon: 'mdi:email-outline',
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'mdi:shield-outline',
  }
]

export default navigation
