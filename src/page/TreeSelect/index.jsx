import React from 'react'
import { TableCap } from '@components/Container'
import RegularInput from '@components/RegularInput'
import { Button, Input, Icon } from 'fish';

const Search = Input.Search

class TreeSelect extends React.Component {

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
        <div style={{width: '10em'}}>
          <RegularInput type='search' excluderRegular={{ reg: /[\$\(\)\*\+\.\[\]\?\\\^\{\}\|]/, msg: '不允许输入特殊字符' }} />
        </div>
      </div>
    )
  }
}

TreeSelect.menuDisplay = "树形选择器"

export default TreeSelect