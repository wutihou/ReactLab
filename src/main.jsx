import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Route, HashRouter as Router, Link} from 'react-router-dom'
import Menus from '../build/menu'
import {Layout, Menu, Icon} from 'fish'

const { Content, Footer, Sider } = Layout;

React.PropTypes = PropTypes

import 'fish/dist/fish.min-1.css'
import 'fish/dist/fish.min-2.css'

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      isShowHello: false,
      minHeight: 360,
      pages: [],
      routes: {
        path: '/'
      }
    };
  }

  componentWillMount() {
    let pages = [];
    for (let m in Menus) {
      pages.push({
        name: Menus[m].name,
        menuDisplay: Menus[m].menuDisplay,
        component: Menus[m]
      });
    }
    this.setState({pages})
  }

  componentDidMount() {
    this.setState({
      minHeight: this.computeMainPanelHeight()
    });
    this.setState({
      routes: this.computeRouters()
    })
  }

  computeRouters() {
    let routes = {
      path: '/',
      component: Content,
      indexRoute: this.state.pages[0]
        ? this.state.pages[0].component
        : null,
      childRoutes: []
    };
    this
      .state
      .pages
      .forEach((item, i) => {
        routes
          .childRoutes
          .push({path: `/${item.name}/`, component: item.component});
      })
    return routes;
  }

  computeMainPanelHeight() {
    let minHeight = 360;
    if (this.refs['content'] && this.refs['footer']) {
      const h2 = window.getComputedStyle(ReactDOM.findDOMNode(this.refs['footer']), null).height;
      minHeight = window.innerHeight - parseFloat(h2);
    }
    return minHeight;
  }

  refresh(arg1, arg2) {
    console.log('Main:refresh', arg1, arg2);
  }

  toggleHello() {
    this.setState({
      isShowHello: !this.state.isShowHello
    })
  }

  render() {
    return (
      <Router ref="content">
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
          }}
            onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}>
            <div className="logo"/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              {this
                .state
                .pages
                .map((item, i) => {
                  const TagName = item.name
                  const Component = item.component
                  return (
                    <Menu.Item key={TagName}>
                      <Link to={`/${TagName}`}>
                        <Icon type="read"/>
                        <span className="nav-text">{item.menuDisplay || TagName}</span>
                      </Link>
                    </Menu.Item>
                  )
                })
}
            </Menu>
          </Sider>
          <Layout>
            <div style={{
              minHeight: this.state.minHeight,
              background: '#fff'
            }}>
              {this
                .state
                .pages
                .map((item, i) => {
                  const path = `/${item.name}`
                  return <Route key={`${item.name}-${i}`} path={path} component={item.component}></Route>
                })}
            </div>
            <Footer style={{
              textAlign: 'center'
            }} ref="footer">
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(
  <Main/>, document.getElementById('app'));