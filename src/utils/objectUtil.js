const objKeySort = function (obj) { // 对对象中的key排序
    var newkey = Object.keys(obj).sort();
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj; //返回排好序的新对象
}

const sortKeyForJson = function (obj) { 
    let sortedObj = objKeySort(obj)
    for (let k in sortedObj) { 
        if (typeof sortedObj[k] === 'object') { 
            sortedObj[k] = sortKeyForJson(sortedObj[k])
        }
    }
    return sortedObj
}

export {
    objKeySort,
    sortKeyForJson
}