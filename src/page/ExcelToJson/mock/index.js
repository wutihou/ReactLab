import { md5 } from '../../../utils/math'

const file = 'theme'

const fetchRes = () => {
    return new Promise((resolve, reject) => {
        fetch(`/local/${file}.json`).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            resolve(jsonResponse)
        })
    })
}


const getJson = function () {
    return new Promise((resolve, reject) => {
        fetchRes().then(res => {
            const translate = function (obj, col1, col2) {
                let arr = []
                loopSheet(arr, obj, '_root_', col1, col2)
                return arr
            }

            const checkDuplicate = function (table) { 
                const datas = table.datas
                datas.forEach((item1, i) => { 
                    const sheetName = item1.sheetName
                    datas.forEach((item2, j) => { 
                        if (i !== j && item1.sheetName === item2.sheetName) { 
                            console.log('find duplicate sheetName:', item2.sheetName)
                            return false
                        }
                    })
                })
            }

            const changeTooLongSheetName = function (table) {
                const datas = table.datas
                const sheetNameMap = []
                datas.forEach((item1, i) => { 
                    const sheetName = item1.sheetName
                    if (sheetName.length > 31) {
                        let key = md5(sheetName, 8)
                        let o = {}
                        o['col1'] = key
                        o['col2'] = sheetName
                        item1.sheetName = key
                        sheetNameMap.push(o)
                    }
                })
                return sheetNameMap
            }

            const loopSheet = function (input, obj, sheetName, col1, col2, path) {
                let cloneInput = Object.assign([], input)
                let preSheetName = path

                let newSheet = {
                    sheetData: [],
                    sheetName: preSheetName? preSheetName : sheetName
                }
                for (let key in obj) {
                    let o = {}
                    o[col1] = key
                    if (typeof obj[key] === 'object') {
                        const preSheetNameBak = (preSheetName || '')
                        preSheetName = preSheetNameBak + `${key}!`
                        let searchKey = preSheetName
                        o[col2] = searchKey + '(不要翻译)'
                        loopSheet(input, obj[key], key, col1, col2, preSheetName)
                        preSheetName = preSheetNameBak
                    } else {
                        o[col2] = obj[key]
                    }
                    newSheet.sheetData.push(o)
                }
                input.push(newSheet)
                
                return input
            }

            const sheetDatas = translate(res, 'col1', 'col2')
            let option = {
                fileName: `${file}`,
                datas: sheetDatas.reverse()
            }
            checkDuplicate(option)
            const sheetNameMap = changeTooLongSheetName(option)
            if (sheetNameMap.length > 0) { 
                option.datas.push({
                    sheetData: sheetNameMap,
                    sheetName: '表格名称映射'
                })
            }
            resolve(option)
        })
    })

}

export {
    getJson
}