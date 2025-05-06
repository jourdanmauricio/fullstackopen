import { useState } from 'react'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleIncreaseGood = () => setGood(good + 1)
  const handleIncreaseNeutral = () => setNeutral(neutral + 1)
  const handleIncreaseBad = () => setBad(bad + 1)
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleIncreaseGood}>good</button>
      <button onClick={handleIncreaseNeutral}>neutral</button>
      <button onClick={handleIncreaseBad}>bad</button>
      <h2>statistics</h2>
      <div>
        <p>good {good}</p>
        <p>nutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  )
}

export default App