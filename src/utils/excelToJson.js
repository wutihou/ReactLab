



const parseExcel = function (fromTo, excel) {
    const cloneExcel = Object.assign({}, excel)
    delete cloneExcel['!ref']

    const info = getFromTo(excel)
    // const dur = fromTo.split(':')
    // let key1 = dur[0].substring(0, 1)
    // let key2 = dur[1].substring(0, 1)
    // let i = Number(dur[0].substring(1))
    // let len = Number(dur[1].substring(1)) + 1
    let key1 = info.colume1Key, key2 = info.colume2Key
    let i = 1, len = info.len + 1

    const json = {}
    for (; i < len; i++) {
        json[cloneExcel[`${key1}${i}`]['v']] = cloneExcel[`${key2}${i}`]['v']
    }

    return json
}

const getFromTo = function (excel) { 
    const keys = Object.keys(excel)
    const colume1 = [], colume2 = []
    keys.forEach((item, i) => { 
        if (item.indexOf('A') != -1) {
            colume1.push(item)
        } else if (item.indexOf('B') != -1) { 
            colume2.push(item)
        }
    })
    return {
        len: colume1.length,
        colume1Key: "A",
        colume2Key: "B"
    }
}

function loopRecoveryJson(json, jsonClone,  path) { 
    for (let k in json) { 
        const newPath = path + k + '!'
        if (jsonClone[newPath]) {
            json[k] = jsonClone[newPath]
            delete jsonClone[newPath]
            loopRecoveryJson(json[k], jsonClone, newPath)
        }
    }
    return json
}

function transferRecovery(json, rule) {
    const r = {
        '#': '*',
        '%': '/'
    }
    const rk = Object.keys(r)
    for (let key in json) {
        let index = -1
        if ((index = rk.indexOf(key)) >= 0) {
            const newKey = r[key]
            json[newKey] = json[key]
            delete json[key]
        }
    }
    return json
}

const recorveryJson = function (json, sheetname) {

    let jsonClone = Object.assign({}, json)

    let obj = json[sheetname]
    let prePath = ''
    // delete json[sheetname]
    for (let k in obj) {
        for (let kk in jsonClone) { 
            const searckKey = kk.replace(/\!$/, '')
            if (k === searckKey) {
                const newPath = prePath + kk
                obj[k] = jsonClone[kk]
                delete jsonClone[kk]
                loopRecoveryJson(obj[k], jsonClone, newPath)
                break
            }
        }
    }
    jsonClone = null
    transferRecovery(obj, null)
    return obj
}

export {
    parseExcel,
    recorveryJson
}