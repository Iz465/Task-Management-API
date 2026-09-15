
export async function createUser(username, password, email)
{
    const response = await fetch('http://localhost:5239/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email

        })
    })
 
    return response
}

export async function login(username, password)
{ 
    const response = await fetch('http://localhost:5239/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })

    return response
}