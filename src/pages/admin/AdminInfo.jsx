import { useState, useEffect } from 'react';

const AdminInfo = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', profileImage: '' });

  useEffect(() => {
    fetch('http://localhost:8899/api/auth/me') // แก้เป็น API ที่ดึงข้อมูล user จริง ๆ
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData({ username: data.username, email: data.email, profileImage: data.profileImage });
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/user/update', { // แก้เป็น API อัปเดตข้อมูลจริง ๆ
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setUser(formData);
    setEditing(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Info</h2>
      <div className="flex flex-col items-center">
        <img src={formData.profileImage || '/default-avatar.png'} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
        {editing && (
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        )}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-2">
            <label className="block text-sm font-semibold">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" disabled={!editing} />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" disabled={!editing} />
          </div>
          {editing ? (
            <button type="submit" className="btn btn-primary w-full mt-4">Save Changes</button>
          ) : (
            <button type="button" className="btn btn-secondary w-full mt-4" onClick={() => setEditing(true)}>Edit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminInfo;
