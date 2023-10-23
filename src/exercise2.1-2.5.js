const Course = ({ courses }) => {
  return (
    <div>
      <Header />
      <Content courses={courses} />
    </div>
  );
};

const Content = ({ courses }) => {
  console.log(courses[0].name);

  return (
    <div>
      {courses.map((course) => (
        <div>
          <h2>{course.name}</h2>
          <p>
            {course.parts.map((part) => {
              return (
                <p>
                  {part.name}: {part.exercises}
                </p>
              );
            })}
          </p>
          <strong>
            Total Exercises:
            {course.parts.reduce((acc, obj) => {
              return acc + obj.exercises;
            }, 0)}
          </strong>
        </div>
      ))}
    </div>
  );
};

const Header = ({ courses }) => {
  return (
    <div>
      <h1>Web Development Curriculum</h1>
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course courses={courses} />;
};

export default App;
