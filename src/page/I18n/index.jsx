import React from 'react'
import { i18nEnhance, initI18n, FormattedMessageWrapper, FormattedMessageBuilder } from '../../ability/i18n';
import { Button } from 'fish'
import mock from './mock/module'

const FormattedMessage = FormattedMessageWrapper([{ set: "module", key: "warningTable" }, { set: "component", key: "page1" }])
const __ = FormattedMessageBuilder([{ set: "module", key: "warningTable" }, { set: "component", key: "page1" }])

class I18n extends React.Component {

  constructor(props) {
    super(props)

    this.i18nResource = {
      component: {
        page1: {
          "table.ok": "确定",
          "table": "表格",
          "table.calcel": "取消{table},{aa }"
        }
      },
      module: mock
    }

    initI18n({
      resource: this.i18nResource
    })

  }

  test() {
    console.time('duration')
    this.runI18n().then((res) => {
      console.timeEnd('duration')
      //console.log('test result:', res)
    })
    //console.log('test end')
  }

  runI18n() {
    return new Promise((resolve) => {
      let result = [],
        executeCount = 0
      const keys = ["add3"]

      for (let i = 0; i < 10000; i++) {
        for (let j = 0, len = keys.length; j < len; j++) {
          let val = this.getI18n(keys[j], {'table': 6, 'aa': '密码', threshold: 9})
          result.push(val)
          executeCount++
        }
      }
      resolve({executeCount, result})
    })

  }

  @i18nEnhance([{set: "module", key: "{%}/settings/roleSettings"}, {set: "component", key: "page1"}])
  getI18n(key, match, defVal) {
      return defVal || `Not found ${key} ${match}`
    }

    render() {

      return (
        <div>
        <Button onClick={() => {
          this.test()
          }}>测试一下</Button>
          <div>
            <div>{__('table.calcel', {'table': 6, 'aa': '密码', threshold: 9})}</div>
          <FormattedMessage id="table.calcel" values={{'table': 6, 'aa': '密码', threshold: 9}} defaultMessage="你好"></FormattedMessage>
        </div>
      </div>
      )
    }
  }

  I18n.menuDisplay = "国际化"

  export default I18n