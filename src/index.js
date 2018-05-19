import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import { createStore , applyMiddleware} from "redux"
import { Provider } from "react-redux"
import thunk  from 'redux-thunk'

import {reducer} from "./redux/reducer.js"  
import Goods from './page/goods/goods.js'
import Comments from './page/comment/comment.js'
import Business from './page/business/business.js'
import Header from './common/header/header.js'
import './index.css'

const store = createStore(
	reducer, 
	applyMiddleware(thunk)
)

const App = () => (
    <HashRouter>
        <div id="app">
            <Header></Header>
            <Switch>
                <Route path="/goods" component={Goods}></Route>
                <Route path="/comments" component={Comments}></Route>
                <Route path="/business" component={Business}></Route>    
                <Redirect exact from="/" to="/goods"></Redirect>
            </Switch>
        </div>
    </HashRouter>
)

ReactDOM.render(
    <Provider store={store}>
		<App></App>
	</Provider>
    ,
    document.getElementById("root")
)
registerServiceWorker()
