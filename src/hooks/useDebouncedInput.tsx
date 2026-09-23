import React, { useState, useEffect } from "react";
import axios from "axios"

const useDebouncedInput = () => {
  const [username, setUsername] = useState<string>("");
  const [debouncedUsername, setDebouncedUsername] = useState<string>("");
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if(!e.target.value){
      setUsername("");
      setDebouncedUsername("");
      setAvailability(null);
      setUsernameError(null);
      setIsLoading(false);
      return;
    };

    const username = e.target.value?.toLowerCase();

    setUsername(username);
    setAvailability(false);
    setUsernameError(null)

    if (!/^[a-z0-9]+$/.test(username)) {
      setUsernameError("Username should must be alphanumerical");
    } else if (username.length < 3) {
      setUsernameError("Username length must be atleast 3 characters");
    } else if (username.length > 20) {
      setUsernameError("Username must be under 20 characters");
    }
  }

  useEffect(() => {
    if (!/^[a-z0-9]{3,20}$/.test(username)) {
      return;
    }

    const timerID = setTimeout(() => {
      setDebouncedUsername(username);
    }, 300);

    return () => {
      clearTimeout(timerID);
    }
  }, [username])

  useEffect(() => {
    if (!/^[a-z0-9]{3,20}$/.test(debouncedUsername)) {
      return;
    }

    const sendApiRequest = async (): Promise<void> => {
      setIsLoading(true);
      const url = `${import.meta.env.VITE_SERVER_URL}/api/user/availability?username=${debouncedUsername}`;


      try {
        const response = await axios.get(url);
        setIsLoading(false);
        
        const { data, message } = response.data;
        const { available } = data;

        if (available) {
          setAvailability(true);
          setUsernameError(null);
        } else {
          setAvailability(false);
          setUsernameError(message);
        } 
      } catch (e) {
        console.error(e);

        setAvailability(null);
        setUsernameError("Server Error");
      } finally{
        setIsLoading(false);
      }
    }

    sendApiRequest();

  }, [debouncedUsername]);

  return {
    username,
    setUsername,
    debouncedUsername,
    setDebouncedUsername,
    availability,
    setAvailability,
    usernameError,
    setUsernameError,
    isLoading,
    setIsLoading,
    handleUsername
  }
}

export default useDebouncedInput;