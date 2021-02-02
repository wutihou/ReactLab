import React from 'react'
import { Button, Input, Icon } from 'fish';


class DiffPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [{
        key: 0,
        content: "000"
      }]
    }
  }

  execute() {
    // const { list } = this.state
    // list.push({
    //   key: list.length,
    //   content: `${list.length}${list.length}${list.length}`
    // })
    this.setState({
      list: [
        {
          key: 3,
          content: "000"
        },
        {
          key: 0,
          content: "222"
        }
      ]
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState !== this.state) { 
      console.log('state changed', nextState)
    }
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <Button onClick={() => { this.execute() }}>测试</Button>
        <div>
          <ul>
            {
              list.map(item => { 
                return <li key={item.key}>{item.content}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

DiffPage.menuDisplay = "Diff算法测试"

export default DiffPage