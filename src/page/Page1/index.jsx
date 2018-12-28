import React from 'react'
import Hello from '@components/Hello'
class Page1 extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Hello></Hello>
        )
    }
}

Page1.menuDisplay = "首页"

export default Page1