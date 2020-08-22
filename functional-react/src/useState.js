import React , {useState} from 'react';

function UseState() {

  const [ number , setNumber ] = useState()
  const [ secNumber , setSecNumber ] = useState()
  const [ result , setResult ] = useState();

  const sum = () => {
    const intNumber = parseInt(number)
    const secIntNumber = parseInt(secNumber)

    setResult ( intNumber + secIntNumber )
  }

  /*}
  const [ state , setState ] = useState({
    number : 0,
    secNumber : 0,
    result : 0
  })
  */

  return (
    <div>
      Number 1: <br />
      <input type="number" value={number} onChange={event => setNumber(event.target.value)} /><br />
      Number 2: <br />
      <input type="number" value={secNumber} onChange={event => setSecNumber(event.target.value)} /><br />
      <button onClick={sum}>Sum</button> <br />
      Result: <br />
      <input type="text" value={result}/><br />
    </div>
  );
}

export default UseState;
