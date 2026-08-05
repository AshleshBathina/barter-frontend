import { useState, useEffect } from "react";

const LoginPage = (props) => {

  const { name } = props

  const [username, setUsername] = useState("")
  const [lateUsername, setLateUsername] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if (!username) return;
    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/user/availability?username=${username}`);
      setLoading(false)
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setLateUsername(data.available);
          console.log(data.available);
        }
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }, [username])

  const handleChange = e => {
    setUsername(e.target.value);
  }

  return (
    <div className="">
      <input value={username} onChange={handleChange} />
      <p>{!loading ? lateUsername ? `${username} is available` : "Not available" : "loading"}</p>
    </div>
  )
}

export default LoginPage