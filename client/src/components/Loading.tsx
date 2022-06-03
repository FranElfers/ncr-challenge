import { FunctionComponent, PropsWithChildren } from "react"

type LoadType = FunctionComponent<PropsWithChildren<{loaded:boolean,custom?:string}>>
const Load:LoadType = ({loaded, children, custom}) => {
	return loaded ? <>{children}</> : <p>{custom||'Loading...'}</p>
}

export default Load