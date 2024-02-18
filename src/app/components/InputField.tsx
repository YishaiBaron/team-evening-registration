// components/InputField.tsx
import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  register: any;
  onChange: (value: any,id: any) => void; // Callback for onChange
}



const InputField: React.FC<InputFieldProps> = ({ label, type, id, placeholder, register,onChange}) => (
  
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="p-2 w-full border rounded"
      {...register(id, { required: true},
       )}
       
      onChange={(e) => {
        onChange(e.target.value,e.target.id);
     
      }} 
    />
        

  </div>
);

export default InputField;
