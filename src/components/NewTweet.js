import React, { Component } from 'react';
import { handleAddTweet } from '../actions/tweets';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'


class NewTweet extends Component {

    state = {
        text: '',
        toHome : false,    
    }

    handleChange = (e) => {
       const text = e.target.value;
       this.setState(() => ({
           text
       })); 
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {text} = this.state;
        //Todo : add tweet to store
        this.setState(() => ({
            text: '',
            toHome:  id ? false : true
        })); 

        const { dispatch, id } = this.props;
        dispatch(handleAddTweet(text, id))
        
      


    }

    render () {

        const {text, toHome} = this.state;
        const tweetLeft = 280 - text.length;

        if(toHome === true){
            return  <Redirect  to='/' />
        }

        return(
            <div>
                <h3 className='center'>Compose new Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="What's happening?"
                        value={text}
                        onChange={this.handleChange}
                        className='textarea'
                        maxLength={280}
                    />
                    {tweetLeft <= 100  && (
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}

                    <button
                        className='btn'
                        type='submit'
                        disabled={text === ''}
                    >
                        Submit
                    </button>


                </form>
            </div>
        )
    }
}

function mapStateToProps ( {authedUser} ) {
    
    //const tweet = tweets[id];
    //const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
    return {
        authedUser,
       /* tweet: tweet ? 
            formatTweet(tweet, users[tweet.author], authedUser, parentTweet) :
                null */
    }
}

export default connect(mapStateToProps)(NewTweet);