import { useEffect, useState } from "react"
import { Oval } from "react-loader-spinner"
import "./App.css"
type Quote = {
  content: string,
  author: string,
}
const App = () => {
  const [quoteInfo, setQuoteInfo] = useState<Quote>({
    content: "",
    author: ""
  })
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isCopying, setIsCopying] = useState<boolean>(false)
  const fetchQuote = async () => {
    setQuoteInfo({
      content: "",
      author: ""
    })
    setIsFetching(true)
    await fetch("https://api.quotable.io/random").then(response => response.json()).then(data => {
      setQuoteInfo(data)
      setIsFetching(false)
    }
    )
  }

  const copyQuote = () => {
    setIsCopying(true)
    navigator.clipboard.writeText(quoteInfo?.content)
    setTimeout(() => {
      setIsCopying(false)
    }, 2000);
  }
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