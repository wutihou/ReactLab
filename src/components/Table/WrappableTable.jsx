import React from 'react'
import { Table } from 'fish';


class WrappableTable extends React.Component {

  constructor(props) {
    super(props)
    this.extendProps = {}
  }
  render() {
    const props = {
      ...this.props,
      ...this.extendProps
    }
    return (
      <Table ref="table" {...props}></Table>
    )
  }
}

const radio = function(target) {
  const render = target.prototype.render
  target.prototype.render = function() {
    Object.assign(this.extendProps, {
      rowSelection: {
        type: 'radio'
      }
    })
    return render.apply(this)
  }
}

@radio
class DeviceTable extends WrappableTable {

}



export default WrappableTable

export { 
    DeviceTable
}