import React, { Component, Fragment   } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';

import {
  Route
} from "react-router-dom";

class App extends Component {

  componentDidMount() {
    this.props.handleInitialData();  //thanks to mapDispatch to props we can dispatch actions this way
  } 

  render() {


    return (

      <Fragment>
        <LoadingBar />
        <div className='container'>
        {this.props.loading === true
          ? null 
          : <div>
              <Nav />
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/tweet/:id' component={TweetPage} />
              <Route exact path='/new' component={NewTweet} />
            </div>
        }
        </div>

      </Fragment>

      
    )
  }


}


const mapDispatchToProps = dispatch => {
  return {
    handleInitialData : () => {
      dispatch(handleInitialData())
    }
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
} 



export default connect(mapStateToProps, mapDispatchToProps)(App);

