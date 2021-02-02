import React from 'react'
import { Application } from '@sdp.nd/js-app-parser-android'
import { stringUtil } from '../../utils'

class AppInfo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      packageName: '',
      imgSrc: ''
    }
  }

  fileSelect() {
    let f = this.refs['fileInput'].files;
    Application.loadAsync(f[0]).then(application => {
      const iconStream = stringUtil.arrayBufferToBase64(application.iconSteam)
      this.setState({
        packageName: application.package,
        imgSrc: iconStream
      })
      console.log(iconStream)
   });
  }

  render() {
    return (
      <div>
        <input
          type="file"
          name="file"
          ref="fileInput"
          onChange={() => {
          this.fileSelect()
          }}></input>
        <div>{'包名:' + this.state.packageName}</div>
        <img src={this.state.imgSrc}></img>
      </div>
    )
  }
}

AppInfo.menuDisplay = "获取应用信息"

export default AppInfo;