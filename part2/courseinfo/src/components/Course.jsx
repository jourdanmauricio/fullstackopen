const Header = ({course}) => {
  return (
    <h2>{course}</h2>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map( part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />  
      )}
    </>
    )
}

const Total = ({parts}) => {
  return (
    <p><strong>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</strong></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
