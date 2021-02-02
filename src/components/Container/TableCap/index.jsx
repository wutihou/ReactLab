import React from 'react'
import PropTypes from 'prop-types'
import {Layout} from 'fish';

import style from './style.scss'

/**
 * 表格顶部操作区容器
 */
class TableCap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const left = this.props.left || []
    const right = this.props.right || []
    return (
      <Layout className={style['component-align']}>
        <div className={style['_container']} style={this.props.style}>
          <div className={style['_left']}>
            {
              left.map((item, index) => {
                return (
                  <span key={index}>
                    {item}
                  </span>
                )
              })
            }
          </div>
          <div className={style['_right']}>
            {
              right.map((item, index) => {
                return (
                  <span key={index}>
                    {item}
                  </span>
                )
              })
            }
          </div>

        </div>
      </Layout>
    )
  }
}

TableCap.propTypes = {
  left: PropTypes.array,
  right: PropTypes.array,
  style: PropTypes.object
}

export default TableCap