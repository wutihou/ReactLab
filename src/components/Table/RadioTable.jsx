import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'fish';

const RadioTableWrapper = function (WrappedTable) {
  return class extends React.Component {
    static displayName = 'RadioTable'
    render() {
      const props = {
        ...this.props,
        rowSelection: {
          type: 'radio'
        }
      }
      return (
        <WrappedTable ref="table" {...props}></WrappedTable>
      )
    }
  }
}

const RadioTable = RadioTableWrapper(Table)

export default RadioTable