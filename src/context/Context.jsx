import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext()

const ContextProvider = (props) => {

 //1 to save the input data
 const [input , setInput] = useState("")
//2 when clicking in the send button the input field data will be saved in  setPrompt
const [recentPrompt , setRecentPrompt] = useState("")
//3 we will use to store all the input history and show it on the recent tab
const [prevPrompts , setPrevPrompts] = useState([])
//4  if this state true it will hide the greeting and cards and it will show the result
const [showResult,setShowResult] = useState(false)
//5 if this state is true it will show a loading animation and after geting data it will be false
const [loading , setLoading] = useState(false)
//6 display result on the webpage
const [resultData , setResultData] = useState("")



const newChat = () => {
  setLoading(false)
  setShowResult(false)
  
}



    const onSent = async(prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevPrompts(prev=>[...prev,input])
        const response =  await run(input)
        setResultData(response)
        setLoading(false)
        setInput("")
    }


     const contexValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
     }

    return(
        <Context.Provider value = {contexValue}>
         {props.children}
        </Context.Provider>
    )
}

export default ContextProvider 