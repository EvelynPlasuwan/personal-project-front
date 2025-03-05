// import React, { useState } from 'react';
// import axios from 'axios';
// import useAuthStore from '../../store/auth-store';

// const ProfileImageUpload = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { token, user, setUser } = useAuthStore();

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('image', file);

//     setLoading(true);
//     setError(null);

//     try {
//       // 1. อัพโหลดรูปไปที่ Cloudinary
//       const uploadResponse = await axios.post(
//         'http://localhost:8899/api/image/upload',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       // 2. อัพเดทข้อมูล User ด้วย URL ที่ได้
//       const response = await axios.patch(
//         'http://localhost:8899/api/users/profile-image',
//         { imageUrl: uploadResponse.data.url },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       setUser({ ...user, profileImage: response.data.profileImage });
//     } catch (error) {
//       console.error('Upload error:', error);
//       setError(error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัพโหลด');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div className="avatar">
//         <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//           <img
//             src={user?.profileImage || '/default-avatar.png'}
//             alt="Profile"
//           />
//         </div>
//       </div>

//       <label className="btn btn-primary btn-sm">
//         {loading ? 'กำลังอัพโหลด...' : 'เปลี่ยนรูปโปรไฟล์'}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="hidden"
//           disabled={loading}
//         />
//       </label>

//       {error && (
//         <div className="alert alert-error">
//           <span>{error}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileImageUpload;