import { useRef } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const clientName = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
  const login = () => {
    navigate("/"+clientName.current?.value, {replace:true})
  }

  return <form>
    <input ref={clientName} type="text" required />
    <button type='submit' className="verde" onClick={login}>Ingresar</button>
  </form>
}

export default Login