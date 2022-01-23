import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const {id} = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      const res = await user.json()
      setUser(res)
    }
    getUser()
  }, [id])

  return (
    <div>
      <h1>{user.username}</h1>
    </div>
  )
}

export default User;