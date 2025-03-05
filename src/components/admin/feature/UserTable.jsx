import React from 'react';
import { format } from 'date-fns';

const UserTable = ({ users, onEditClick, onDeleteClick }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Event Count</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm')}</td>
              <td>{user.eventCount}</td>
              <td>
                <span className={`badge ${user.role === 'ADMIN' ? 'badge-primary' : 'badge-secondary'}`}>
                  {user.role}
                </span>
              </td>
              <td className="flex gap-2">
                <button 
                  className="btn btn-sm btn-outline btn-info" 
                  onClick={() => onEditClick(user)}
                >
                  Edit Role
                </button>
                <button 
                  className="btn btn-sm btn-outline btn-error" 
                  onClick={() => onDeleteClick(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;