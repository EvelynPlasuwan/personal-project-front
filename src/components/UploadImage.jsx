import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const UploadImage = ({ name }) => {
    const { setValue, watch } = useFormContext();
    const [preview, setPreview] = useState(null);
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue(name, file); // บันทึกไฟล์ลงใน React Hook Form
            setPreview(URL.createObjectURL(file)); // แสดง preview
        }
    };

    return (
        <div className="space-y-4">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {preview && 
            <img 
            src={preview} 
            alt="Preview" 
            referrerPolicy="no-referrer"
            className="w-[1420px] h-[570px] object-cover rounded-lg" />}
        </div>
    );
};

export default UploadImage;
