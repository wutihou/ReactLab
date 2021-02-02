import MD5 from 'md5'

const randomNum = function (size) {
    const len = size || 8
    let result = ''
    for (let i = 0; i < len; i++) { 
        let n = Math.floor(Math.random() * 10)
        result += n
    }
    return result
}

const md5 = function (msg, size) { 
    return MD5(msg).substring(0, size)
}

export { 
    randomNum,
    md5
}