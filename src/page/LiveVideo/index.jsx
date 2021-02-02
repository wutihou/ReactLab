import React from 'react'
import videojs from 'video.js'
import './index.css'


class LiveVideo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      searchText: null
    }
  }

  componentDidMount () {
    const url = 'rtmp://172.24.132.143:1935/live/V3930fbd8de74547ad9eeec0689b1ded21?key=4b4ad0cf-f8d8-4610-9e55-4f4e0e354a47&id=V3930fbd8de74547ad9eeec0689b1ded21'
    const player = videojs(this.video, {
      muted: false,
      width: 500,
      height: 300,
      autoplay: true,
      controls: false,
      fullscreenToggle: true,
      sources: [{ src: url, type: 'rtmp/flv' }]
    })
    
  }

  render() {
    return (
      <video id="my-player" className='.video-js' ref={ref => {this.video = ref}}>
      </video>
    ) 
  }
}

LiveVideo.menuDisplay = "视频直播"

export default LiveVideo