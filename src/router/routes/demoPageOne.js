/* demoPageOne 备注 */
import layout from '@/components/layout/Index'

// 页面备注
const pageOneIndex = resolve => require(['@/components/pages/demoPageOne/Index'], resolve)
const pageOneDetail = resolve => require(['@/components/pages/demoPageOne/Detail'], resolve)

const routes = [
  {
    path: '/demo-page-one',
    component: layout,
    children: [
      {
        path: 'detail',
        component: pageOneDetail
      },
      {
        path: 'index',
        component: pageOneIndex
      }
    ]
  }
]

export default routes
