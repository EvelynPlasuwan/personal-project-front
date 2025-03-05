import React from 'react';

const DeleteConfirmModal = ({ user, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(user.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-error">confirm deleting user</h2>
        
        <div className="mb-4">
          <p>Do you want to delete this user</p>
          <div className="mt-2 bg-gray-100 p-3 rounded">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button 
            className="btn btn-outline" 
            onClick={onClose}
          >
            cancle
          </button>
          <button 
            className="btn btn-error" 
            onClick={handleConfirm}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;