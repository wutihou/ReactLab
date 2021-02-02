import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'fish'
import './style.css'
const Search = Input.Search

const errorColor = '#ff5745'

const TYPE = {
  search: Search,
  input: Input
}

class RegularInput extends React.Component {
  
  constructor(props) { 
    super(props)
    this.state = {
      legal: true,
      value: ''
    }
    this.Comp = TYPE[this.props.type] || TYPE.input
  }

  $valid() {
    return this.state.legal
  }

  render() {
    const { excluderRegular, onChange, onFilterred } = this.props
    const { value, legal } = this.state
    const Comp = this.Comp
    return (<div className={`component-regularinput ${!legal? 'illegal': ''}`}>
      <Comp style={{borderColor: !legal?errorColor: null}} {...this.props} onChange={(e) => {
        const { value } = e.target
        if (excluderRegular && excluderRegular.reg.test(value)) {
          this.setState({ value, legal: false })
          onFilterred && onFilterred(e)
        } else {
          this.setState({ value, legal: true })
          onChange && onChange(e)
        }
      }} value={value}/>
      {!legal && <div className='msg' >{excluderRegular.msg}</div>}
    </div>)
  }
}

RegularInput.propTypes = {
  excluderRegular: PropTypes.object,
  onChange: PropTypes.func,
  onFilterred: PropTypes.func,
  type: PropTypes.string
}

export default RegularInput
