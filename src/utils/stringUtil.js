const replaceValue = function(str, value) {
    if (!value) {
        return str;
    }
    const reg = /(\{\s*\w+\s*\})/g
    const strArr = str.split(reg) // 根据占位符分割字符串
    const strMatched = strArr.map((item) => { // 取出占位符关键字，并替换为传进的对象对应的值
        let result = item
        const isMatch = /(\{|\})/.test(item)
        if (isMatch) {
            const key = item.replace(/(\{|\})/g, '').replace(/\s+/g,"")
            value[key] && (result = value[key])
        }
        return result
    })
    return strMatched.join('')
}

export {
    replaceValue
}