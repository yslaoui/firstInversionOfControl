const Header = ({course}) => <h1>{course.name}</h1>

const Part = ({part}) => <p> {part.name} {part.exercises} </p>

const Content = ({course}) =>  {
  const parts = course.parts
  return(
    <>
      {parts.map(x =>
        <Part key={x.id} part = {x} />
      ) 
      } 
    </>
  )
}

const Total = ({course}) => <p>Number of exercises {course.parts.reduce((sum, x) => sum + x.exercises, 0)}</p>



const Courses = ({course}) => {
  return(
    <>
      <Header course = {course}/>
      <Content course = {course}/> 
      <Total course={course}/>
    </>

  )
}

export default Courses