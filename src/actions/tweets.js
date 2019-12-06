import {saveLikeToggle, saveTweet} from '../utils/api';
import {addUserTweet} from '../actions/users';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';


export function receiveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    }   
}

export function toggleTweet({id, authedUser, hasLiked}){
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}


export function handleToggleTweet (info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))
        return saveLikeToggle(info)
                .catch((e) => {
                    console.warn('Error in handleToggleTweet', e);
                    dispatch(toggleTweet(info))
                })
    }
}

export function addTweet (tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleAddTweet (text,replyingto) {
    return (dispatch, getState) => {

        const { authedUser } = getState()

        dispatch(showLoading())
        saveTweet({
            text,
            author: authedUser,
            replyingto: replyingto
        })
            .then((tweet) => {
                dispatch(addTweet(tweet));
                dispatch(hideLoading());

            })
            .catch((e) => {
                console.warn('Error in addTweet');
            })

    }
}