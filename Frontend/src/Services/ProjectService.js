
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