import React, { useEffect, useState, useRef } from 'react';
import * as Realm from "realm-web";
const kimicon = require('../assets/kim.png');
const kimsfood = require('../assets/kimfood.png')
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

    const foodamount = useRef();
    const treatamount = useRef();


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
            }else {
                console.log(exists);
                if(data.fetching){
                    setData(exists)
                };
            }
        }

        updateData();

    },[collection, dateString, data.fetching]);

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
            console.log('null')
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
            console.log('null')
            settreatWindow(false);
        }
    };

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
                <div className ="Dates-container"> 
                <div className = "Main-date">TODAY</div>
                <div className = "Main-date">{day}/{month}</div>
                </div>
                <div className = "Food-inputs">
                    {feedWindow?(<div className = "Food-giveFood">
                        <input type = "number" placeholder="Amount(%)" className="Food-input" ref={foodamount}></input>
                        <button className = "Button-update" onClick ={e => {updateFood()}}>UPDATE</button>
                    </div>)
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
            <div></div>
        </div>
    );
};

export default Main;