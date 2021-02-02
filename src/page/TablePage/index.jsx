import React from 'react'
import { Table, Input, Button, Icon } from 'fish';
import { TableCap } from '@components/Container'
import { mockData } from './mock'

const Search = Input.Search

class TablePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      searchText: null
    }
  }

  componentWillMount() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
      width: '20em',
      ...this.getColumnSearchProps('name')
    }, {
      title: 'Age',
        dataIndex: 'age',
        width: '20em',
        align: 'center',
        ...this.getColumnSearchProps('age')
    }, {
      title: 'Address',
        dataIndex: 'address',
        align: 'center',
        ...this.getColumnSearchProps('address')
      }];
    this.setState({
      columns
    })
  }

  getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
        </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
        </Button>
          </div>
        ),
      filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      }
    }
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {
    const { columns } = this.state
    const tableProps = {
      columns,
      dataSource: mockData
    }

    const left = [<Search placeholder="input search text"></Search>]
    const right = [
      <Button><Icon type="plus" /></Button>,
      <Button style={{margin: "0 .5em"}}><Icon type="close" /></Button>,
      <Button><Icon type="warning" /></Button>
    ]

    const props = {
      left,
      right
    }

    const style = {
      padding: '5px 15px'
    }

    return (
      <div>
        <TableCap {...props} style={style}></TableCap>
        <Table {...tableProps}></Table>
      </div>
    ) 
  }
}

TablePage.menuDisplay = "通用表格"

export default TablePage