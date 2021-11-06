import React, { useEffect, useMemo, useCallback } from 'react'
import { Button, Table } from 'antd'
import { BreadCrumb, Layout, Search } from '@/components'
import { ImitateSuspense, createFetcher } from './components/ImitateSuspense'
import { useList } from '@/hooks'
import { getSchema, getColumns } from './config'

const { Content } = Layout

const List = (props) => {
  const { history, pathname } = props
  const list = useList('/user-group/list')

  const fetchSomethingApi = useCallback(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 3000)
    })
  }, [])


  const fetchData = useMemo(() => createFetcher(fetchSomethingApi), [])

  useEffect(() => {
    fetchData()
  }, [])

  const handleAdd = () => {
    history.push(`${pathname}/add`)
  }

  const handleEdit = ({ id }) => {
    history.push(`${pathname}/edit/${id}`)
  }

  const handleDelete = () => {
    console.log('删除:', record)
  }

  const handleChangeStatus = () => {
    console.log('更新状态:', record)
  }

  useEffect(() => {
    // list.onRefresh()
  }, [])

  const schema = getSchema()
  const columns = getColumns({
    handleEdit,
    handleDelete,
    handleChangeStatus,
  })
  return (
    <ImitateSuspense fallback="加载中">
      {fetchData()}
      <Layout loading={list.loading}>
        <BreadCrumb
          routes={['告警规则管理']}
          extra={
            <Button
              type="primary"
              onClick={handleAdd}
            >
              新建告警
            </Button>
          }
        />
        <Content>
          <Search
            schema={schema}
            onSearch={list.onSearch}
          />
          <Table
            {...list.table}
            columns={columns}
            scroll={{ x: 'max-content' }}
          />
        </Content>
      </Layout>
    </ImitateSuspense>
  )
}

export default List
