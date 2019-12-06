/*
the value of the next parameter will be determined by 
the applyMiddleware function. Why? All middleware will be called 
in the order it is listed in that function. 
In our case, the next will be dispatch because logger is 
the last middleware listed in that function.
(next could be dispatch or the next middleware)
*/

const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action: ', action)
        const returnValue = next(action) //dispatch the action (we update the state)
        console.log('The new state: ', store.getState()); //we access the state updated
    console.groupEnd()
    return returnValue;
}

export default logger;