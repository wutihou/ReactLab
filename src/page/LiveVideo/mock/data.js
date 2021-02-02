const unint = [{
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
    }];

const data = []
for (let i = 0; i < 10; i++) { 
    for (let j = 0; j < unint.length; j++) {
        const item = JSON.parse(JSON.stringify(unint[j]))
        item['key'] = data.length
        data.push(item)
    }
}

export default data