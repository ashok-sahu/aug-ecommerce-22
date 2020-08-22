import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Layout from './container/Layout'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <Switch>
      <Navbar/>
      <Route exact path='/' component={Layout}/>
    </Switch>
  )
}

export default App
