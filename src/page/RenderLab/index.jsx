import React from 'react'
import { Button, Input, Icon } from 'fish';

class RenderLab extends React.Component {

  constructor(props) {
      super(props)
      
      this.state = {
          title: 0,
          content: 0
      }
    }
    
    update(key) {
        if (key) {
            let target = this.state[key]
            target++
            this.setState({
                [key]: target
            })
        } else { 
            this.setState({
                title: ++this.state.title,
            })
            this.setState({
                content: ++this.state.content
            })
        }
        
    }

    render() {
        const { title } = this.state
        console.log('render', title)
        return (
            <div >
                <Button onClick={() => { this.update('title') }}>更新title</Button>
                <Button onClick={() => { this.update('content') }}>更新content</Button>
                <Button onClick={() => { this.update() }}>更新title和content</Button>
        </div>
        )
  }
}

RenderLab.menuDisplay = "渲染性能测试"

export default RenderLab