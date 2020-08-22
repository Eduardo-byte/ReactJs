import { useReducer } from 'react'


const INITIAL_STATE = {
    result: ''
}


const sumReducer = ( state = INITIAL_STATE , action ) => {
    console.log('action executed: ' , JSON.stringify(action))
    switch( action.type ){
        case 'SUBTRACT' :
        case 'SUM' :
            return { ...state, result: action.payload }
        default:
            return state;    
    }
}

const useStore = () => useReducer( sumReducer , INITIAL_STATE )

export default useStore