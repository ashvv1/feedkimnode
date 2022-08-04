import React, { useEffect, useState, useRef } from 'react';
import * as Realm from "realm-web";
import History from './History';
const kimicon = require('../assets/kim.png');
const kimsfood = require('../assets/kimfood.png');
const hxIcon = require('../assets/hxicon.png');
const commentsIcon = require('../assets/commenticon.png');


const Main = (user) => {
    const app = Realm.getApp(user.user.rid);
    const mongo= app.currentUser.mongoClient('mongodb-atlas');
    const collection = mongo.db("feedkim").collection("days");
    const date = new Date();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const dateString = day.toString()+"/"+month.toString();


    const [data, setData] = useState({
        fetching: true
    }
    );
    
    const [feedWindow, setfeedWindow] = useState(false);
    const [treatWindow, settreatWindow] = useState(false);
    const [hxWindow, sethxWindow] = useState(false);
    const [commentsWindow, setcommentsWindow] = useState(false);
    const [hx, setHx] = useState();

    const foodamount = useRef();
    const treatamount = useRef();
    const comment = useRef();



    useEffect( () => {
        const checkExists = async () => {
            const record = await collection.findOne({
                date: dateString
              });
            return(record);
        };

        const updateData = async () => {
            const exists = await checkExists();
            if (!exists) {
                collection.insertOne(
                    {
                        date: dateString,
                        food: 0,
                        treats: 0,
                        comments: "",
                    }
                )
                setData(
                    {
                        date: dateString,
                        food: 0,
                        treats: 0,
                        comments: "",
                    }
                )
            }else {
                if(data.fetching){
                    setData(exists)
                };
            }
        }

        const getHx = async () => {
            const fetchedHx = await collection.find();
            setHx(fetchedHx);
        }

        updateData();
        if (!hx){
        getHx();
        }

    },[collection, dateString, data.fetching, hx]);

    const updateFood = async () => {
        if(foodamount.current.value){
        const update = await collection.updateOne(
            { date: `${dateString}` },
            { $set: {food: (data.food + parseInt(foodamount.current.value)) } }
          );

         if(update){
            setfeedWindow(false);
            setData({
                fetching: true
            })
         }
        }else{
            setfeedWindow(false);
        }  
    };

    const updateTreats = async () => {
        if(treatamount.current.value){
        const update = await collection.updateOne(
            { date: `${dateString}` },
            { $set: {treats: (data.treats + parseInt(treatamount.current.value)) } }
          );

         if(update){
            settreatWindow(false);
            setData({
                fetching: true
            })
         }  
        }else {
            settreatWindow(false);
        }
    };

    const submitComment = async () => {
        const newComment = comment.current.value
        if(newComment){
            console.log(newComment)
            const update = await collection.updateOne(
                { date: `${dateString}` },
                { $set: {comments: data.comments + "-" + newComment } }
              );
    if(update){
        setcommentsWindow(false);
        setData({
            fetching: true
        })
     }  
    }else{
        settreatWindow(false);
    }
}

    if (data.fetching){
        return (
            <div className="Loading-screen">
                <img src={kimicon} className="Loading-icon" alt ="kim icon loading" ></img>
                <span>LOADING</span>
            </div>
        )
    }
    return (
        <div className = "Main-container">
            <img className = "Main-icon" alt = "kim icon" src={kimicon} height ="30%"/>
            <div className = "Main-inputs">
                <div className ="Header-container">
                    <div className ="Comments-icon"  onClick = {e => setcommentsWindow(!commentsWindow)}>
                        <img src={commentsIcon} alt="comment icon"/>
                    </div>

                <div>
                    <div className = "Main-date">TODAY</div>

                <div className = "Main-date">{day}/{month}</div>
                </div>
                <div className ="Hist-icon" onClick = {e => hxWindow?sethxWindow(false):sethxWindow(true)}>
                    <img src={hxIcon} alt="history icon"/>
                </div>
                
                </div>
                <div className = "Food-inputs">
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
                    (null)
                    }
                    {feedWindow?(
                        <div className = "Food-giveFood">
                            <div className = "Food-giveFood-background"></div>
                        <input type = "number" placeholder="Amount(%)" className="Food-input" ref={foodamount}></input>
                        <button className = "Button-update" onClick ={e => {updateFood()}}>UPDATE</button>
                    </div>
                    )
                    :
                    (null)}
                    {treatWindow?(<div className = "Food-giveFood">
                        <input type= "number" placeholder="# of Treats" className="Food-input" ref={treatamount}></input>
                        <button className = "Button-update" onClick ={e => {updateTreats()}}>UPDATE</button>
                    </div>)
                    :
                    (null)}
                    <div className = "Food-bag">
                    <div className = "Food-bag-icon">
                    <img className = "Food-background" alt="kimsfoodback" src={kimsfood} width='100%' height="auto" />
                    <div className = "Food-amount">{data.food}%</div>
                    </div>
                    <div className = "Food-addremove">
                        <button className = "Button-feed" onClick = {e=> setfeedWindow(true)}>GIVE FOOD</button>
                    </div>
                    
                    </div>
                    <div className = "Food-treat">
                        <div className = "Treat-counter">
                            <span className = "Treat-counter-value">{data.treats}</span>
                            <p>TREATS GIVEN</p>
                        </div>
                        <div className = "Food-addremove">
                        <button className = "Button-feed" onClick = {e=> settreatWindow(true)}>GIVE TREATS</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;