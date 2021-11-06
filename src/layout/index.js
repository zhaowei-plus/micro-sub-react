import './public-path'
// 这里可以使用模拟实现 ImitateSuspense 做替换
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, Skeleton } from 'antd'
import { setup } from '@formily/antd-components'
import zhCN from 'antd/lib/locale/zh_CN'

import Routes from '@/routes'
import { ImitateSuspense } from '@/components'
import Container from './components/Container'

import 'antd/dist/antd.css'
import './index.less'

// formily 注册表单
setup()

function render(props) {
  console.log('render props:', props)
  const { container } = props
    ReactDOM.render(
      <ConfigProvider locale={zhCN}>
        <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/react' : '/'}>
          <Container>
            <Suspense fallback={<Skeleton />}>
              <Routes />
            </Suspense>
          </Container>
        </BrowserRouter>
      </ConfigProvider>,
      container ? container.querySelector('#root') : document.getElementById('root'),
    )
}

// 独立运行微应用
if (!window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-line [no-undef]
  render({});
}

export async function bootstrap() {

}

export async function mount(props) {
  render(props)
}

export async function unmount(props) {
  const { container } = props
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.getElementById('root'))
}
