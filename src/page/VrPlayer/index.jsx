import React from 'react'
import * as THREE from 'mxreality.js/build/three'
import {VR} from 'mxreality.js/build/mxreality'
import Style from './style.scss'
window.THREE = THREE; // 重要，不设置则会报未定义错误！！！！！！

const src = 'https://betacs.101.com/v0.1/download?dentryId=d3864730-07cb-47d0-85ac-56a2dc9c4ee8&size=960'

console.log(Style)

class VrPlayer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    let scene=new THREE.Scene()
    let renderer=new THREE.WebGLRenderer()
    this.refs.container.appendChild(renderer.domElement);
    let vr=new VR(scene,renderer,this.refs.container);
    this.vr = vr
    vr.loadProgressManager.onLoad=function () {
      // vr.VRObject.getObjectByName("__mxrealityDefault").visible = true;
      // console.log('loaded',vr.VRObject.getObjectByName("__mxrealityDefault").visible)
      // vr.controls.enable=false;
    }
    vr.loadProgressManager.onProgress=function () {
      console.log("onProgress")
    }
    vr.loadProgressManager.onError=function () {
      console.log("onError")
    }
    vr.init(function(){

    })
    vr.playPanorama('resource/vr.mp4', vr.resType.video);
    // vr.playPanorama(src);
  }

  componentWillUnmount () {
    this.vr.destory()
  }


  render() {
    
    return <div className={Style['video-wrap']}>
      <div className='vr-container' ref='container'></div>
    </div>
  }
}

VrPlayer.menuDisplay = "VR资源播放器"

export default VrPlayer;