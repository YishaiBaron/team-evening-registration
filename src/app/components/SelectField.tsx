// components/SelectField.tsx
import React from 'react';

interface SelectFieldProps {
  label: string;
  id: string;
  options: any[];
  register: any;
  onChange: (value: any,id: any) => void; // Callback for onChange

}

const SelectField: React.FC<SelectFieldProps> = ({ label, id, options, register,onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <select
      id={id}
      className="p-2 w-full border rounded"
      {...register(id, { required: true })}
      onChange={(e) => {
        onChange(e.target.value,e.target.id);
     
      }} 
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
        
      ))}

    </select>
  </div>
);

export default SelectField;
