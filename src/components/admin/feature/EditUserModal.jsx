import React, { useState } from 'react';

const EditUserModal = ({ user, onClose, onSave }) => {
  const [role, setRole] = useState(user.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.id, role);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit User Role</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select 
              className="select select-bordered w-full" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={onClose}
            >
              cancle
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;