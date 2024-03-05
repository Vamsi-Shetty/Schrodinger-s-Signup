import React, {useEffect, useState} from 'react';
import './Signup.css';
import axios from 'axios';

const Signup = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isOnline, setIsOnline] = useState(true);
    const [localStorage, setLocalStorage] = useState();

    const updateStatus = (e) => {
      if(navigator.onLine) {
        setIsOnline(true);
        console.log("online")
      }
      else {
        setIsOnline(false);
        console.log("offline");
      }
    }

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    const storeLocally = () => {
      let formData = {name, email, password};
      setLocalStorage(formData);
      console.log(localStorage)
    }

    const postData = async () => {
      try {
        let formData = {name, email, password} || localStorage;
        console.log(formData);
        await axios.post('http://localhost:3001/signup', formData);
        alert("Signup Successful")
      } catch (error) {
        console.log(error);
      }
    }  
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if(isOnline) {
        postData();
      }
      else {
        storeLocally();
      }
    }

    useEffect(() => {
      isOnline ? postData() : storeLocally()
    }, [isOnline])
    

  return (
    <div className='formInput'>
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
             type="text" 
             onChange={(e) => setName(e.target.value)} />
            <br />
            <label>Email:</label>
            <input type='email'
             onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label>Password</label>
            <input type='password'
             onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type='submit'>Signup</button>
        </form>
        {isOnline ? "" : alert("Oops! We're Offline, Don't worry we'll finish once we're back")}
    </div>
  )
}

export default Signup