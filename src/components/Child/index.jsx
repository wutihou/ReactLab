/*
 * @Author: WTH
 * @Description: 
 * @Date: 2018-12-20 10:18:51
 * @LastEditTime: 2018-12-28 16:41:58
 */
import React from 'react'
import PropTypes from 'prop-types'

class Baby extends React.Component {
  // 声明需要使用的Context属性
  static contextTypes = {
    propA: PropTypes.string,
    propEvent: PropTypes.string,
    getData: PropTypes.func
  }

  constructor(props) {
    super(props)
  }

    componentDidMount() { 
        this.context.getData();
    }


  render() {
    return (
      <div>Baby</div>
    )
  }
}

class Child extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {}


  render() {
    return (
        <div>Child
              <Baby></Baby>
      </div>
    )
  }
}

export default Child