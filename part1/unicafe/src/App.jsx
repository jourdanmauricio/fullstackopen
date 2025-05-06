import { useState } from 'react'


const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  } 

  return (
  <table>
    <tbody>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/> 
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={good + neutral + bad}/> 
      <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)} /> 
      <StatisticLine text='positive' value={(good * 100) / (good + neutral + bad) + ' %'} /> 
    </tbody>
  </table>
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