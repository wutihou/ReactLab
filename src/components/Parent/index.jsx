/*
 * @Author: WTH
 * @Description: 
 * @Date: 2018-12-20 10:18:51
 * @LastEditTime: 2019-02-01 16:23:04
 */
import React from 'react'
import PropTypes from 'prop-types'
import Child from '@components/Child'
import Hello from '@components/Hello'

class Parent extends React.Component {

  // 声明Context对象属性
  static childContextTypes = {
    propA: PropTypes.string,
    methodA: PropTypes.func
  }

  // 返回Context对象，方法名是约定好的
  getChildContext() {
    return {
      propA: 'propA',
      methodA: () => 'methodA'
    }
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {}


  render() {
    return (
      <div>
        parent
            <Child></Child>
            <Hello></Hello>
      </div>
    )
  }
}

export default Parent