import React from 'react'
// import ReactJWPlayer from 'react-jw-player2'


class JwPlayer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {

    return <div>
      <Search />
        {/* <ReactJWPlayer
            playerId='my-unique-id'
            // file="mock/119944594-1-6.mp4"
            file="rtmp://172.24.132.143:1935/live/872a6662d307f2175ad06322128f91c8"
            sources={[
              {
                file: "rtmp://172.24.132.143:1935/live/872a6662d307f2175ad06322128f91c8"
              }
            ]}
             /> */}
    </div>
  }
}

JwPlayer.menuDisplay = "JwPlayer测试"

export default JwPlayer