import React, { useEffect, useState, useRef } from 'react';
import History from './History';
const kimicon = require('../assets/kim.png');
const kimsfood = require('../assets/kimfood.png');
const hxIcon = require('../assets/hxicon.png');
const commentsIcon = require('../assets/commenticon.png');





const Guest = () => {

    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = day.toString() + "/" + month.toString();


    const [commentsWindow, setcommentsWindow] = useState(false);
    const [feedWindow, setfeedWindow] = useState(false);
    const [treatWindow, settreatWindow] = useState(false);
    const [hxWindow, sethxWindow] = useState(false);
    const [hx, setHx] = useState(
                [
                    {
                date: "26/07",
                food: 60,
                treats: 3,
                comments: ""
                    }
                , {
                    date: "27/07",
                    food: 75,
                    treats: 2,
                    comments: "ate a lot of grass"
                }
            ]
    )
    const [data, setData] = useState(
        {
            date: dateString,
            food: 0,
            treats: 0,
            comments: ""
        }
    )

    const foodamount = useRef();
    const treatamount = useRef();
    const comment = useRef();

    const updateFood = async () => {
        if(foodamount.current.value){
            data.food = data.food + parseInt(foodamount.current.value);
            setfeedWindow(false)
        }else{
            setfeedWindow(false)
        }  
    };

    const updateTreats = () => {
        if(treatamount.current.value){
            data.treats = data.treats + parseInt(treatamount.current.value);
            settreatWindow(false)
        }else {
            settreatWindow(false)
        }
    };

    const submitComment = () => {
        const newComment = comment.current.value
        setData(
            {
                ...data,
                comments: data.comments + newComment
            }
        )
        setcommentsWindow(false);
        console.log(data);
    }

    return (
        <div className="Main-container">
            <img className="Main-icon" alt="kim icon" src={kimicon} height="30%" />
            <div className="Main-inputs">
            <div className ="Header-container">
                    <div className ="Comments-icon" onClick = {e => setcommentsWindow(!commentsWindow)}>
                        <img src={commentsIcon} alt="comment icon"/>
                    </div>

                <div>
                    <div className = "Main-date">TODAY</div>

                <div className = "Main-date">{day}/{month}</div>
                </div>
                <div className ="Hist-icon" onClick = {e => sethxWindow(!hxWindow)}>
                    <img src={hxIcon} alt="history icon"/>
                </div>
                
                </div>
                <div className="Food-inputs">
                {commentsWindow?(
                     <div className = "Comments-window">
                        <div className="Comments-header">
                        <h4>Comments:</h4>
                        <button className = "Comments-submit" onClick={e => submitComment()}>Submit</button>
                        </div>
                        <input className = "Comments-input" ref={comment} placeholder={data.comments+"..."}></input>
                     </div>)
                     :
                     (null)
                }
                {hxWindow?(
                    <div className = "Hist-window"><History hx = {hx}/>
                    </div>)
                    :
                    (null)}
                    {feedWindow ? (<div className="Food-giveFood">
                        <input type="number" placeholder="Amount(%)" className="Food-input" ref={foodamount}></input>
                        <button className="Button-update" onClick={e => { updateFood() }}>UPDATE</button>
                    </div>)
                        :
                        (null)}
                    {treatWindow ? (<div className="Food-giveFood">
                        <input type="number" placeholder="# of Treats" className="Food-input" ref={treatamount}></input>
                        <button className="Button-update" onClick={e => { updateTreats() }}>UPDATE</button>
                    </div>)
                        :
                        (null)}
                    <div className="Food-bag">
                        <div className="Food-bag-icon">
                            <img className="Food-background" alt="kimsfoodback" src={kimsfood} width='100%' height="auto" />
                            <div className="Food-amount">{data.food}%</div>
                        </div>
                        <div className="Food-addremove">
                            <button className="Button-feed" onClick={e => setfeedWindow(true)}>GIVE FOOD</button>
                        </div>

                    </div>
                    <div className="Food-treat">
                        <div className="Treat-counter">
                            <span className="Treat-counter-value">{data.treats}</span>
                            <p>TREATS GIVEN</p>
                        </div>
                        <div className="Food-addremove">
                            <button className="Button-feed" onClick={e => settreatWindow(true)}>GIVE TREATS</button>
                        </div>
                    </div>
                </div>

            </div>
            <div></div>
        </div>
    );
};

export default Guest;