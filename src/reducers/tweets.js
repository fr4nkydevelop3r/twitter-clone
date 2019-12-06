import { RECEIVE_TWEETS, ADD_TWEET } from '../actions/tweets';
import { TOGGLE_TWEET } from '../actions/tweets';
export default function tweets (state = {}, action) {
    switch(action.type) {
        case RECEIVE_TWEETS :
            return {
                ...state,
                ...action.tweets
            }
        case TOGGLE_TWEET : 
            return {
                ...state,
                [action.id] : {
                    ...state[action.id],
                    likes : action.hasLiked === true
                    ? state[action.id].likes.filter((uid) => uid !== action.authedUser )
                    : state[action.id].likes.concat([action.authedUser])
                }
            }
        case ADD_TWEET:
                   
            const { tweet } = action;

            let replyingto = {};

            if(tweet.replyingto !== null){
               replyingto = {
                   ...state,
                   [tweet.replyingto]: {
                       ...state[tweet.replyingto],
                       replies: [...state[tweet.replyingto].replies, tweet.id] 
                   }
               }
            }


            return{
                ...state,
                [tweet.id]: tweet,
                ...replyingto
                }
            
        default:
            return state;

    }
}