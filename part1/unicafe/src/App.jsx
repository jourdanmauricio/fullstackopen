import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  return (
  <>
    <p>good {good}</p>
    <p>nutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {good + neutral + bad}</p>
    <p>average {(good - bad) / (good + neutral + bad)}</p>
    <p>positive {(good * 100) / (good + neutral + bad)} %</p>
  </>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App