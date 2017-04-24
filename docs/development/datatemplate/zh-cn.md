## 模板加载数据

在很多项目开发案例中，我们需要利用同一个模板根据URL请求去获取对应的数据最后渲染出对应的结果，如 `/post/123` `/post/65535` 都会用到同样的 `Post.jsx` 组件来渲染页面。*Super-Project* 支持这一方式的同构。

#### 开发步骤

1. 引入 react-redux 的 `connect`，并对 React 组件进行 `connect()`，无论是否会用到 Redux 相关功能。
2. 在 React 组件中加入静态方法 `static preprocess(state, dispatch)`
   * 在该方法中派发（dispatch）一个获取数据方法的 Promise，Promise 中写入 redux dispatch。
   * 该方法仅针对服务器环境，服务器渲染时会等待 Promise 执行完成后再渲染模板。
3. React 组件中用标准的逻辑编写客户端环境中执行的获取数据代码。
4. 建议利用 `sp-ui-pagecontainer` 的 `PageContainer` 来管理“载入中”“出错”等状态。

代码示例

```js
// API

import axios from 'axios'
import * as actions from '/redux/actions.js'

const getPostData = (postId) => {
    return axios.get('/user/post/?pid=' + encodeURIComponent(postId))
        .then(data => {
            if (data.data) return data.data
            return data
        })
        .catch(e => {
            console.log(e)
        })
}

export const fetch = (postId) => {
    // 如果传入 redux state，从 state 中得到 ID
    if (typeof postId === 'object') {
        if (postId.routing && postId.routing.locationBeforeTransitions) {
            const segs = postId.routing.locationBeforeTransitions.pathname.split('/')
            let indexPrev = -1
            segs.some((value, index) => {
                if (value === 'posts') indexPrev = index
                return indexPrev !== -1
            })
            postId = decodeURIComponent(segs[indexPrev + 1])
        }
    }

    return (dispatch) => getPostData(postId)
            .then(data => {
                return dispatch(actions.fetch(
                    postId,
                    data
                ))
            }).catch(function (error) {
                // console.log(postId, error)
                dispatch(actions.fetch(
                    postId,
                    {
                        error: '' + error
                    }
                ))
            })
}
```

```jsx
// React 组件

import React from 'react'
import { connect } from 'react-redux'

import PageContainer from 'sp-ui-pagecontainer'

import * as actions from '/redux/actions.js'
import * as postInfoApi from '/redux/post-info/apis.js'

import { ImportStyle } from 'sp-css-import'
import style from './styles.less'

@connect(
    (store, ownProps) => {
        const postId = decodeURIComponent('' + ownProps.params.id)
        const from = ownProps.router.location.query.f || ''

        let props = {
            postId: postId,
            postInfo: store.postInfo[postId],
            isLoading: store.postInfo[postId] ? false : true,
            isError: store.postInfo[postId] && store.postInfo[postId].code !== 0 ? true : false
        }

        if (/^profile\-/g.test(from))
            props.fromProfile = from.split('profile-')[1]

        return props
    }
)
@ImportStyle(style)
export default class extends React.Component {
    // only for server render
    static preprocess(state, dispatch) {
        const preprocessTasks = []
        preprocessTasks.push(
            dispatch(postInfoApi.fetch(state))
        )
        return preprocessTasks
    }

    renderPostInfo() {
        if (!this.props.postInfo && __CLIENT__) {
            this.props.dispatch(postInfoApi.fetch(this.props.postId))
            return ''
        } else {
            if (this.props.postInfo.code === 0) {
                return (
                    <div class="body-success">
                        {this.props.postInfo.data}
                    </div>
                )
            } else {
                return (
                    <div className="body-error">
                        Error {this.props.postInfo.code}
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <PageContainer
                className={this.props.className}
                isLoading={this.props.isLoading}
                isError={this.props.isError}
            >
                {this.renderPostInfo()}
            </PageContainer>
        )
    }
}
```

#### 行为原理

在服务器渲染时，如果组件存在 `preprocess()` 静态方法，会等待该方法执行结束后再执行其他渲染流程。通常来说，`preprocess()` 中执行的代码就是一个 Redux dispatch，将获取到的内容输出到 Redux store 中。

在客户端渲染时，`preprocess()` 静态方法会被无视，所以需要自行再做一套逻辑。