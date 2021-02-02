import React from 'react'
import PropTypes from 'prop-types'
import Parent from '@components/Parent'
class Event extends React.Component {

  // 声明Context对象属性
  static childContextTypes = {
    propEvent: PropTypes.string,
    getData: PropTypes.func
  }

  // 返回Context对象，方法名是约定好的
  getChildContext() {
    return {
      propEvent: 'propEvent',
      getData: () => {
        this.getData();
      }
    }
  }

  getData() {
    console.log('fatch data');
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Parent>
      </Parent>
    )
  }
}

Event.menuDisplay = "事件传递"

export default Event