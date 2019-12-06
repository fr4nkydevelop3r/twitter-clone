export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_NEW_TWEET = 'ADD_NEW_TWEET';

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users
    }    
}


export function addUserTweet(tweet){
    return {
        type: ADD_NEW_TWEET,
        tweet
    }
}