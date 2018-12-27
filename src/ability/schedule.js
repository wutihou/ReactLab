/*
 * @Author: WTH
 * @Description: 
 * @Date: 2018-12-20 14:39:01
 * @LastEditTime: 2018-12-21 11:57:55
 */

/**
 * @description
 * @param {*} option = {
 *      exec: string, 定时任务方法名(必选项)
 *      release: string, 手动停止定时任务方法名(可选项，没有该参数，默认自动在componentWillUnmount终止定时任务)
 *      freq: number 定时任务频率，单位：毫秒
 * }
 * @returns
 */
function schedule(option) {
    return function (target) {
        if (target.prototype[option['exec']]) { // 把刷新方法重写为定时器
            const oriFreshMethod = target.prototype[option['exec']];
            target.prototype[option['exec']] = function () {
                this.interval = setInterval(oriFreshMethod.bind(this, ...arguments), option['freq'] || 5000)
            }
        }
        if (target.prototype[option['release']]) { 
            const oriRelease = target.prototype[option['release']];
            target.prototype[option['release']] = function () {
                this.interval && clearInterval(this.interval);
                oriRelease && oriRelease.apply(this, arguments)
            }
        }
        if (target.prototype.componentWillUnmount) {
            const oriComWillUnMount = target.prototype.componentWillUnmount;
            target.prototype.componentWillUnmount = function () { // 重写componentWillUnmount方法，组件卸载时，取消定时器
                this.interval && clearInterval(this.interval);
                oriComWillUnMount && oriComWillUnMount.call(this)
            }
        }
    }
}

export default schedule
