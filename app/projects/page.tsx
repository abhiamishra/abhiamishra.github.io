import React from 'react'

interface Albums {
    id: number;
    name: string;
}

const ProjectsPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', 
        {next: { revalidate: 10 } }) //cache only in fetch function in nextjs. 
  const data: Albums[] = await res.json();

  return (
    <>
        <h1>Projects</h1>
        <ul>
            {data.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    </>
  )
}

export default ProjectsPage