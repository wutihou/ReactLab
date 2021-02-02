import React from 'react'
import { TableCap } from '@components/Container'
import { Button, Input, Icon } from 'fish';

const Search = Input.Search

class LayoutPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
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
        <Input/>
      </div>
    )
  }
}

LayoutPage.menuDisplay = "布局"

export default LayoutPage