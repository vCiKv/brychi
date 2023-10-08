import { Dispatch, SetStateAction, useState } from "react";

export default function useToggle(initState?:boolean):[boolean,()=>void,Dispatch<SetStateAction<boolean>>]{
  const [state,setState] = useState(initState??false)
  const toggleState =()=>setState(p=>!p)

  return [state,toggleState,setState]
}