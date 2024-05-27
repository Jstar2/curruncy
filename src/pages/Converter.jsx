import Nav from '../components/Nav'
import CurruncyDropDown from '../components/CurruncyDropDown'
import { useState, useEffect } from 'react'
import { curruncyQuery, getAllCurruncy } from '../service/Services'

const Converter = () => {
  document.title = "Converter"
  
  const [value, setValue] = useState(null);
  const [responce, setResponce] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [dropOne, setDropOne] = useState();
  const [dropTwo, setDropTwo] = useState();
  const [result, setResult] = useState();
  const [emptyField, setEmptyField] = useState();

  useEffect(() => { 
    setLoading(true);
    getAllCurruncy().then((resp) => { setResponce(resp.data.rates); });
    setLoading(false);
    if (responce) {
        setError(true)
    } else {
        setError(false);
    }
  }, [])

  const inputValue = (e) => {
    setValue(e.target.value ? e.target.value : null);
  }

  const handleDropdownOne = (e) => {
    setDropOne(e)
  }
  
  const handleDropdownTwo = (e) => {
    setDropTwo(e)
  }

  const handleClick = () => {
    setResult(null)
    setEmptyField(null)
    if (value === undefined && value !== null) {
      setEmptyField('Please fill all empty field.'); 
    } else if (dropOne === undefined) {
      setEmptyField('Please select from first drop Down.');
    } else if (dropTwo === undefined) {
      setEmptyField('Please select from second drop Down.');
    } else if (value < 0) {
      setEmptyField('Value must be positive number.');
    } else if (dropOne === dropTwo) {
      setEmptyField("Both currency can't be same.");
    } else {
      if(value !== null){
      try {
        curruncyQuery(value, dropOne, dropTwo).then((resp) => {setResult(resp.data.rates) });
      } catch (err) {
        console.log('ERROR: ', err);
        }
      } else {
        setEmptyField("Input value is 0.");
      }}
  }

  return (
    <>
      <Nav />
      <br />
        <div className="container">
        <h5 className="h3">Converter wizard</h5>
        <p>Convert curruncy here... </p>
        <hr />
        </div>
      <br />
      {error ? <h6 className="h3">Error while getting the data</h6> :
        <>
          {loading ? <h5 className="h5">Loading...</h5> :
            <div className='container border border-secondary rounded border-5 '>
              <table>
                <thead>
                  <tr >
                    <th>Convert</th>
                    <th>→</th>
                    <th><input type='number' className='rounded' onChange={inputValue} /></th>
                    <th>From</th>
                    <th className='w-25'><CurruncyDropDown data={responce} onSelect={handleDropdownOne}/></th>
                    <th>To</th>
                    <th className='w-25'><CurruncyDropDown data={responce} onSelect={handleDropdownTwo} /></th>
                    <th><button className='btn btn-primary' onClick={handleClick}>Convert</button>
                    </th>
                    <th className='w-25 p-4'>
                      {result && dropOne !== dropTwo && value > 0 && value !== ""?
                        Object.entries(result).map(([currency, rate]) => (
                          <h6 key={currency}>{rate.toFixed(2)} {currency}</h6>  
                        )): <h6>{emptyField}</h6>} </th>
                  </tr>
                </thead>
              </table>
            </div>
            }
        </>
      }
    </>
  )
}

export default Converter