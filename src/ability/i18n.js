import React from 'react'
import PropTypes from 'prop-types'
import {
    replaceValue
} from '../utils'

const I18NCONFIG = {
    resOri: null, // 资源来源，字符串，用于获取资源
    resOriType: null, // 资源来源类型，对象 object，函数 func
    resource: null
}

const I18nFormattedMessage = function (props) {
    return (<span>{props.value}</span>)
}

I18nFormattedMessage.propTypes = {
    value: PropTypes.string
  }

const FormattedMessageWrapper = function (option) {
    const FormattedMessage = function (props) {
        const key = props.id
        const values = props.values
        const defaultMessage = props.defaultMessage
        const result = newFormat(option, replaceValue, () => defaultMessage || '')(key, values)
    
        return <I18nFormattedMessage value={result} />
      }
      FormattedMessage.propTypes = {
        id: PropTypes.string.isRequired,
        values: PropTypes.object,
        defaultMessage: PropTypes.string
      }
      return FormattedMessage
}

const FormattedMessageBuilder = function (option) {
    const __ = function () {
        const key = arguments[0]
        const values = arguments[1] || {}
        const defaultMessage = arguments[2] || ''
        const result = newFormat(option, replaceValue, () => defaultMessage || '')(key, values)
        return result
    }
    return __
}

const fetchArrObj = (context, arr) => {
    let result = context
    let found = true
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!arr[i]) {
            continue
        }
        if (!result[arr[i]]) {
            found = false
            break
        }
        result = result[arr[i]] || result
    }
    return found ? result : null
}

const findInObject = (key, obj) => {
    let find = false
    let val
    if (typeof obj === 'object' && typeof key === 'string') {
        for (const k in obj) {
            if (typeof obj[k] === 'object') {
                val = findInObject(key, obj[k])
                if (val) {
                    find = true
                    break
                }
            } else {
                if (k === key) {
                    find = true
                    val = obj[k]
                    break
                }
            }
        }
    } else {
        return null
    }
    if (find) {
        return val
    }
    return null
}

const matchKey = function (res, option, key) {
    let resPath = [option.set]
    if (option.key) {
        resPath = resPath.concat(option.key.split('/').map(item => item.replace(/{%}/g, '/')))
    }
    const resValue = fetchArrObj(res, resPath)
    let value = null
    if (!resValue) { // 找不到set和key对应的资源
        console.error('option set and key has not correct set')
        return null
    } else {
        value = findInObject(key, resValue)
    }
    return value
}

const newFormat = function (option, strategy, oldMethod) {
    return function () {
        const key = arguments[0]
        const match = arguments[1]
        let result
        const res = I18NCONFIG.resource
        if (!res) {
            console.error('you have not set i18n resource, please call initI18n first')
            result = oldMethod.apply(this, arguments)
            return result
        }
        let options = []
        if (Array.isArray(option)) { // 如果是数组
            options = options.concat(option)
        } else if (typeof option === 'object') {
            options.push(option)
        }

        let find = false
        for (let i = 0, len = options.length; i < len; i++) {
            const item = options[i]
            result = matchKey(res, item, key)
            if (result) {
                find = true
                break
            }
        }

        if (find) {
            if (match) { // 匹配第二个参数
                if (typeof strategy === 'function') {
                    result = strategy(result, match)
                }
            }
        } else {
            console.warn(`%c not found value of ${key} in set: ${JSON.stringify(option)}, use default value instead`, 'color:blue')
            result = oldMethod.apply(this, arguments)
        }
        return result
    }
}

/**
 * 国际化，注：不支持key： /
 * @param {*} option
 * @param {*} res
 * @param {*} strategy
 */
function i18n(option, strategy) {
    return function (target, name, descriptor) {
        const oldMethod = descriptor.value
        descriptor.value = newFormat(option, strategy, oldMethod)
    }
}

function i18nEnhance(option) {
    return i18n(option, replaceValue)
}

function initI18n(config) {
    Object.assign(I18NCONFIG, config)
}

initI18n.TYPE = {
    func: 'func',
    string: 'string'
}

export {
    i18n,
    i18nEnhance,
    FormattedMessageWrapper,
    FormattedMessageBuilder,
    initI18n
}