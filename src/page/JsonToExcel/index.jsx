import React from 'react'
import ExportJsonExcel from 'js-export-excel'
import { Card, Button, Input , Layout, Row, Col } from 'fish'
import { JsonToExcelUtil, MathUtil } from '../../utils/'

class JsonToExcel extends React.Component {

  constructor(props) {
    super(props)
    this.excels = []
    this.state = {
      allowDown: false,
      uploadFiles: []
    }
  }

  downloadExcel() {
    this.excels.forEach(item => { 
      const toExcel = new ExportJsonExcel(item);
      toExcel.saveExcel();
    })

  }

  inputFileChange() {
    this.excels = []
    const files = this.refs.fileInput.input.files
    const fileQuene = []
    
    this.setState({
      allowDown: false,
      uploadFiles: []
    })

    const readFile = function(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = function() {
          JsonToExcelUtil.jsonToExcelOption(file.name.substring(0, file.name.lastIndexOf('.')), JSON.parse(this.result)).then(option => {
            resolve(option)
          })
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
      this.excels = [...result]
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
              this.downloadExcel()
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

JsonToExcel.menuDisplay = "JSON转Excel"

export default JsonToExcel