import { useEffect, useState } from "react"
import { Oval } from "react-loader-spinner"
import.meta.env.APP_API_URL
import "./App.css"

// type imports
import { Quote } from "./types"

const emptyQuote = {
  content: "",
  author: ""
}

const App = () => {
  // states
  const [quoteInfo, setQuoteInfo] = useState<Quote>(emptyQuote)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isCopying, setIsCopying] = useState<boolean>(false)

  // function to fetch new quote
  const fetchQuote = async () => {
    setQuoteInfo(emptyQuote)
    // starting loader
    setIsFetching(true)
    await fetch(import.meta.env.VITE_API_URL).then(response => response.json()).then(data => {
      setQuoteInfo(data)
      setIsFetching(false)
    }
    ).catch(e => console.log(e.message))
  }

  // function to copy quote
  const copyQuote = () => {
    setIsCopying(true)
    navigator.clipboard.writeText(quoteInfo?.content)
    setTimeout(() => {
      setIsCopying(false)
    }, 2000);
  }

  // loading a quote on app mount/render
  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="container">
      <h1 className="heading">Quote Generator</h1>
      <div className="quote__container">
        {
          isFetching &&
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}

          />
        }
        <h2 className="quote__text">{quoteInfo.content && `"${quoteInfo?.content}"`}</h2>
        <p className="quote__author">- {quoteInfo?.author}</p>
        <div className="btn__container">
          <button className="btn btn--newQuote" onClick={fetchQuote}>New Quote</button>
          <button className="btn" onClick={copyQuote}>{
            isCopying ? "copied!" : "copy"
          }</button>
        </div>
      </div>
    </div>
  )
}

export default App