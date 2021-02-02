import React from 'react'
import { Card, Button, Input, Layout, Row, Col } from 'fish'
import { FileUtil, ObjectUtil } from '~/utils'
import mock from './mock'

class JsonSort extends React.Component {

  constructor(props) {
    super(props)
    this.results = []
    this.state = {
      allowDown: false,
      uploadFiles: []
    }
  }

  downloadJson() {
    this.results.forEach(item => {
      FileUtil.download(item.name, JSON.stringify(item.json))
    })
  }

  inputFileChange() {
    this.results = []
    const files = this.refs.fileInput.input.files
    const fileQuene = []
    
    this.setState({
      allowDown: false,
      uploadFiles: []
    })

    const readFile = function(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = function () {
          let result = JSON.parse(this.result)
          let sortedResult = ObjectUtil.sortKeyForJson(result)
          resolve(sortedResult)
        }
        reader.onprogress = function (progress) {
          const { total, loaded } = progress
          console.log(`progress: ${Math.ceil(loaded*100/total)}%`)
        }
        reader.readAsText(file)
      })
    }

    let uploadFiles = []
    for (let i = 0, len = files.length; i < len; i++) { 
      fileQuene.push(readFile(files[i]))
      uploadFiles.push(files[i].name)
    }

    Promise.all(fileQuene).then(result => {
      uploadFiles.forEach((name, i) => { 
        this.results.push({
          name: name,
          json: result[i]
        })
      })
      this.setState({
        allowDown: true,
        uploadFiles: uploadFiles
      })
    }).catch(error => { 
      console.log(error)
    })
  }

  triggerSelect() { 
    this.refs.fileInput.input.click()
  }

  render() {
    return (
      <Layout>
        <Row>
          <Col span={12} offset={6}>
          <Card
            title='上传json文件' bordered={true} 
            actions={[<Button disabled={!this.state.allowDown} type="primary" shape="circle" size='large' icon="download" onClick={() => {
              this.downloadJson()
              }}></Button>]}>
              <Button type="primary" size='large' onClick={() => { this.triggerSelect() }}>选择文件</Button>
              <ul>
                {this.state.uploadFiles.map((item, i) => { 
                  return <li key={i}>{item}</li>
                })}
              </ul>
              <Input style={{display: 'none'}} name="jsonFiles" type="file" multiple="multiple" ref='fileInput' onChange={(e) => {
            this.inputFileChange()
        }} />
          </Card>
          </Col>
          </Row>
      </Layout>
    )
  }
}

JsonSort.menuDisplay = "JSON对象排序"

export default JsonSort