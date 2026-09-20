
export async function addProject(name, token)
{
    await fetch(`http://localhost:5239/api/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name
        })
    })

  
}

export async function getProjects(token)
{
    const response = await fetch('http://localhost:5239/api/projects', {
        headers: {'Authorization': `Bearer ${token}`}
    })

    if (response.ok)
        return response

}

export async function getProject(token, projectId)
{
    console.log(`projectId: ${projectId}`)
    const response = await fetch(`http://localhost:5239/api/projects/${projectId}`, {
        headers: {'Authorization': `Bearer ${token}`}
    })

    if (response.ok)
        return response

}