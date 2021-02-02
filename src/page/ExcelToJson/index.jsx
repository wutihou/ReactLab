import React from 'react'
import { Card, Button, Input, Layout, Row, Col, Checkbox } from 'fish'
import xlsx from 'xlsx'
import { FileUtil, ExcelToJson as ExcelUtil } from '../../utils'
import style from './style.scss'

class ExcelToJson extends React.Component {

  constructor(props) {
    super(props)
    this.results = []
    this.state = {
      allowDown: false,
      uploadFiles: [],
      sheetName: 'Sheet1',
      format: true
    }
  }

  downloadExcel() {
    const {sheetName, format} = this.state
    this.results.forEach(item => {
      const json = ExcelUtil.recorveryJson(item.json, sheetName)
      FileUtil.download(item.name.replace(/(\.[\w]+)$/, '.json'), format?JSON.stringify(json, undefined,2):JSON.stringify(json))
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

    const readFile = function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onloadend = function () {
          if (this.result) {
            const workbook = xlsx.read(this.result, {
              type: 'binary'
            })
            const jsons = {}
            var fromTo = ''
            for (let sheet in workbook.Sheets) {
              if (workbook.Sheets.hasOwnProperty(sheet)) {
                fromTo = workbook.Sheets[sheet]['!ref']
                jsons[sheet] = ExcelUtil.parseExcel(fromTo, workbook.Sheets[sheet])
              }
            }
            resolve(jsons)
          }
        }

        reader.onprogress = function (progress) {
          const { total, loaded } = progress
          console.log(`progress: ${Math.ceil(loaded * 100 / total)}%`)
        }
        reader.readAsBinaryString(file)
      })
    }

    let uploadFiles = []
    for (let i = 0, len = files.length; i < len; i++) {
      fileQuene.push(readFile(files[i]))
      uploadFiles.push(files[i].name)
    }

    Promise.all(fileQuene).then(result => {
      // this.results = [...result]
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

  onChangeSheetName = (ev) => {
    this.setState({
      sheetName: ev.target.value
    })
  }

  onChangeFormat = (ev) => {
    this.setState({
      format: ev.target.checked
    })
  }

  render() {
    const {
      sheetName,
      format
    } = this.state
    return (
      <Layout className={style['page-excel2json']}>
        <Row>
          <Col span={12} offset={6}>
            <Card
              title='上传excel文件' bordered={true}
              actions={[<Button disabled={!this.state.allowDown} type="primary" shape="circle" size='large' icon="download" onClick={() => {
                this.downloadExcel()
              }}></Button>]}>
              <Button type="primary" size='large' onClick={() => {
                this.triggerSelect()
              }}>选择文件</Button>
              <ul>
                {this.state.uploadFiles.map((item, i) => {
                  return <li key={i}>{item}</li>
                })}
              </ul>
              <div className={style['sheetName']}>
                <span>表名:</span>
                <Input value={sheetName} onChange={this.onChangeSheetName}/>
                <div>
                <Checkbox checked={format} onChange={this.onChangeFormat}>格式化</Checkbox>
                </div>
              </div>
              <Input style={{
                display: 'none'
              }} name="jsonFiles" type="file" multiple="multiple" ref='fileInput' onChange={(e) => {
                this.inputFileChange()
              }} />
            </Card>

          </Col>

        </Row>
      </Layout>
    )
  }
}

ExcelToJson.menuDisplay = "Excel转JSON"

export default ExcelToJson