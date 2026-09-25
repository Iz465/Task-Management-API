
export async function getTasks(token, projectId)
{ 
    const response = fetch(`http://localhost:5239/api/tasks/${projectId}`, {
        headers: {'Authorization': `Bearer ${token}`}
    })

    
    return response
}

export async function addTask(token, projectId, name, dueDate)
{
    const response = fetch(`http://localhost:5239/api/tasks`, {
    
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name,
            dueDate: dueDate,
            projectId: projectId
        })

    })

    
    return response
}

export async function updateTask(token, status, taskId)
{
    const response = await fetch("http://localhost:5239/api/tasks", {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            id: taskId,
            status: status
        })
    })

    return response

}