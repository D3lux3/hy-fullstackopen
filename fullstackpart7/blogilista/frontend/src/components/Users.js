import React from 'react'
import {
    Link
} from 'react-router-dom'




const Users = ({ users }) => {
    const blogStyle = {
        padding: ".6rem 1rem",
        border: '3px solid #33332d',
        marginTop: 15,
        marginBottom: 200,
        boxShadow: "-3px 5px #33332d",
        borderRadius: 6,
    }



    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th />
                        <th>blogs created</th>
                    </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td style={blogStyle}> <Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </table >

        </div >

    )
}



export default Users