import { useState, useEffect } from "react";

const useDebouncedInput = () => {
  const [username, setUsername] = useState("");
  const [debouncedUsername, setDebouncedUsername] = useState("");
  const [availability, setAvailability] = useState(false);
  const [usernameError, setUsernameError] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const handleUsername = (e) => {
    e.preventDefault();

    if(!e.target.value){
      setUsername("");
      setDebouncedUsername("")
      setAvailability(false);
      setUsernameError("");
      setIsLoading(false);
      return;
    };

    const username = e.target.value?.toLowerCase();

    setUsername(username);
    setAvailability("");
    setUsernameError("")

    if (!/^[a-z0-9]+$/.test(username)) {
      setUsernameError("Username should must be alphanumerical")
    } else if (username.length < 3) {
      setUsernameError("Username length must be atleast 3 characters")
    } else if (username.length > 20) {
      setUsernameError("Username must be under 20 characters")
    }
  }

  useEffect(() => {
    if (!/^[a-z0-9]{3,20}$/.test(username)) {
      return;
    } else if (username.length < 3) {
      return;
    } else if (username.length > 20) {
      return;
    }

    const timerID = setTimeout(() => {
      setDebouncedUsername(username)
    }, 300)

    return () => {
      clearTimeout(timerID);
    }
  }, [username])

  useEffect(() => {
    if (!debouncedUsername) {
      setAvailability(false)
      return;
    }

    try {
      const sendApiRequest = async () => {
        const url = `http://localhost:3000/user/availability?username=${debouncedUsername}`;
        setIsLoading(true)
        const response = await fetch(url);
        setIsLoading(false)
        if (response.ok) {
          const responseData = await response.json();
          const { data, message } = responseData;

          const { username, available } = data;

          if (available) {
            setAvailability(available)
            setUsernameError("")
            setIsLoading(false)
          } else {
            setAvailability(false)
            setUsernameError(message)
            setIsLoading(false);
          }
        }
      }

      sendApiRequest()
    } catch (e) {
      console.error(e)
    }

  }, [debouncedUsername])

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

export default useDebouncedInput