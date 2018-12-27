/*
 * @Author: WTH
 * @Description: 
 * @Date: 2018-12-20 10:18:51
 * @LastEditTime: 2018-12-24 14:34:19
 */
import React from 'react'
import { schedule, debounce } from '../../ability'
import styles from './style.scss'

@schedule({
    exec: "onFresh",
    release: "unSchedule",
    freq: 2000
})
class Hello extends React.Component {

    constructor(props) { 
        super(props)
    }
    
    componentWillMount() {
        console.log('挂载', this)
        if (this.checkFresh()) { 
            this.onFresh("xxx", {a: "xxx"});
        }
    }

    componentWillUnmount() { 
        console.log('卸载', this);
    }

    checkFresh() {
        if (this.props.onRefresh)
            return true
        return false
    }

    onFresh(arg1, arg2) {
        console.log('onFresh', this);
        this.props.onRefresh(arg1, arg2);
    }

    unSchedule(arg1, arg2) { 
        console.log('unSchedule')
    }

    @debounce(1000)
    kissMe(arg1, arg2) {
        console.log('kissMe', arg1, arg2)
    }

    render() {
        return (
            <div className={styles.hello}>
                <button onClick={() => { this.unSchedule("sss", "55") }}>点我结束任务</button>
                <button onClick={() => { this.kissMe("sss", "55") }}>快点点我</button>
            </div>
        )
    }
}

export default Hello