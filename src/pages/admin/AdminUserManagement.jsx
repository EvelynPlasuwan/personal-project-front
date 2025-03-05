import React, { useState, useEffect } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../../api/user';
import UserTable from '../../components/admin/feature/UserTable';
import EditUserModal from '../../components/admin/feature/EditUserModal';
import DeleteConfirmModal from '../../components/admin/feature/DeleteConfirmModal'; 

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // ดึงข้อมูล Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // จัดการการแก้ไข Role
  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleSaveRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      fetchUsers(); // รีโหลดข้อมูลหลังจากอัพเดท
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Cannot update user role');
    }
  };

  // จัดการการลบ User
  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };

  const handleConfirmDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers(); // รีโหลดข้อมูลหลังจากลบ
      setDeletingUser(null);
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Cannot delete user');
    }
  };

  return (
    <div className=" w-full ">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      {error && (
        <div className="alert alert-error mb-4">
          <div className="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <label>{error}</label>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <UserTable 
          users={users} 
          onEditClick={handleEditClick} 
          onDeleteClick={handleDeleteClick} 
        />
      )}

      {/* Modal สำหรับแก้ไข Role */}
      {editingUser && (
        <EditUserModal 
          user={editingUser} 
          onClose={() => setEditingUser(null)} 
          onSave={handleSaveRole} 
        />
      )}

      {/* Modal ยืนยันการลบ User */}
      {deletingUser && (
        <DeleteConfirmModal 
          user={deletingUser} 
          onClose={() => setDeletingUser(null)} 
          onConfirm={handleConfirmDelete} 
        />
      )}
    </div>
  );
};

export default AdminUserManagement;