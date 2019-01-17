import React from 'react'
import Style from './style.scss'
class Layout extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={Style.layout}>
                <header>头部</header>
                <main>
                    <article>左边</article>
                    <aside>右边
                    </aside>
                </main>
                <footer>底部</footer>
            </div>
        )
    }
}

Layout.menuDisplay = "布局学习"

export default Layout