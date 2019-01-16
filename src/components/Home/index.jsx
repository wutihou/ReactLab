/*
 * @Author: WTH
 * @Description: 
 * @Date: 2018-12-20 10:18:51
 * @LastEditTime: 2018-12-26 19:47:01
 */
import React from 'react'
import {replaceValue} from '../../utils'

class Home extends React.Component {

  constructor(props) {
    super(props)

    const str = "fsfs fwfw {aa }   , fsfge{ cc }{dd}"
    replaceValue(str, {
      cc: 2,
      aa: "hello",
      dd: "000"
    })
  }

  componentWillMount() {}


  render() {
    return (
      <span>Home</span>
    )
  }
}

export default Home