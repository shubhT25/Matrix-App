import React, { useState } from 'react'

const Calculate = ({length, breadth}) => {
    let temp = []
    let obj = {}
    for(let i=0; i<length;i++){
        const r = []
        for(let j=0; j<breadth; j++){
            r.push("Nan")
            const s = `M${i}${j}`
            obj[s] = null
        }
        temp.push(r)
    }

    const [inputs, setInputs] = useState(obj);
    const [keys, setKeys] = useState([]);
    const [value, setValue] = useState(null);

    const handleChange = (e, key) => {
        setInputs({...inputs,
            [key] : parseInt(e.target.value)
        })
        setValue(0)
    }

    const makeMatrix = () =>{
        const m = []
        for (let i=0; i<length; i++)
        {
          const rows = []
          for(let j=0; j<breadth; j++){
            const key = `M${i}${j}`
            rows.push(<th>
              <label htmlFor={key}>{key}</label>
              <br/>
              <input id={key} onChange={e => handleChange(e, key)}></input>
            </th>)
          }
          m.push(<tr key={i}>{rows}</tr>)
        }
        return (
          <table className='table'>
              <tbody>
                {m}
              </tbody>
          </table>
        )
      }

    const calculate = async () => {
      console.log("In")
        for(let i=0; i<length; i++){
            for(let j=0; j<breadth;j++){
                temp[i][j] = inputs[`M${i}${j}`]
            } 
        }
        let sum = {}
        for(let i=0; i<length; i++){
            for(let j=0; j<breadth; j++){
                if(temp[i][j] === "Nan") {
                    alert(`Value is not present at M${i}${j}`);
                    return
                }
                for(let k=i+1; k<length; k++){
                    for(let l=0; l<breadth; l++){
                        if(k !== i && l!==j){
                            const str = `M${i}${j}_M${k}${l}`
                            sum[str] = temp[i][j] + temp[k][l]
                        }
                    }
                }
            }
        }

        const max_key = Object.keys(sum).reduce((a, b) => sum[a] > sum[b] ? a : b);
        setValue(sum[max_key]);
        setKeys(max_key.split("_"))
    }

  return (
    <div>
       {makeMatrix()}
      <button type='submit' onClick={calculate}>Press to Calculate</button>
        {value ? <h3>
            Maximum sum where two Rooks cannot attack each other is <span>{value}</span> at position <span>{keys[0]}</span> and <span>{keys[1]}</span>
        </h3>: <span></span>}
    </div>
  )
}

export default Calculate
