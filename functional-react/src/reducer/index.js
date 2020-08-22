import React , {useState } from 'react';

import useStore from './sumReducer'

function ReducerHook() {

    const [ number , setNumber ] = useState('')
    const [ secNumber , setSecNumber ] = useState('')

    const [store , dispatch] = useStore()


    const sum = () => {
        const intNumber = parseInt(number)
        const secIntNumber = parseInt(secNumber)

        console.log('sum action dispatch')
        dispatch({
            type : 'SUM',
            payload : intNumber + secIntNumber
        })
    }

    const subtract = () => {
        const intNumber = parseInt(number)
        const secIntNumber = parseInt(secNumber)

        console.log('sub action dispatch')
        dispatch({
            type : 'SUBTRACT',
            payload : intNumber - secIntNumber
        })
    }

    return (
        <div className="container">
        Number 1: <br />
        <input type="number" value={number} onChange={event => setNumber(event.target.value)} /><br />
        Number 2: <br />
        <input type="number" value={secNumber} onChange={event => setSecNumber(event.target.value)} /><br />
        <button onClick={sum}>Sum</button> <br />
        <button onClick={subtract}>Subtract</button> <br />
        Result: <br />
        <input type="text" value={store.result} readOnly/><br />
        </div>
    );
}

export default ReducerHook;
