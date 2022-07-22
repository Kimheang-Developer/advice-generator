import React, { useState, useEffect } from 'react';
import './App.css';
import desktopDivider from "./img/pattern-divider-desktop.svg";
import mobileDivider from "./img/pattern-divider-mobile.svg";
import iconDice from "./img/icon-dice.svg";
import axios from 'axios';

function App() {
    const [advice, setAdvice] = useState([]);
    const [adviceNumber, setAdviceNumber] = useState("");
    const [adviceQuote, setAdviceQuote] = useState("");

    const fetchAdvice = async () => {
        const data = await axios.get('https://api.adviceslip.com/advice')
        //console.log(data.data.slip.id)
        setAdviceNumber(data.data.slip.id)
        setAdviceQuote(data.data.slip.advice)
    };

    useEffect(() => {
        axios.get(`https://api.adviceslip.com/advice`).then((result) => {
            const data = result
            //console.log(data.slip)
            setAdvice(data)
            setAdviceNumber(data.data.slip.id)
            setAdviceQuote(data.data.slip.advice)
        })
    }, [])

    return (
        <>
            <div className='container'>
                {" "}
                {advice ? (
                    <>
                        <h4 className='advice_number'>{`Advice #${adviceNumber}`}</h4>
                        <div className='quote_wrap'>
                            <p className='advice_quote'>{`"${adviceQuote}"`}</p>
                        </div>
                        <div className='desktop_divider'>
                            <img src={desktopDivider} alt=''/>
                        </div>
                        <div className='mobile_divider'>
                            <img src={mobileDivider} alt=''/>
                        </div>
                        <div className='dice_button'>
                            <button onClick={fetchAdvice}>
                                <img src={iconDice} alt=''/>
                            </button>
                        </div>
                    </>
                ) : (
                    <div>Loading ...</div>
                )}
                
            </div>
        </>
    );
}

export default App;
