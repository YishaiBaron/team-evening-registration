// components/Checkbox.tsx
import React from 'react';

interface CheckboxProps {
  label: string;
  id: string;
  register: any;
  onChange: (value: any,id: any) => void; // Callback for onChange
  disabled:boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, register ,onChange,disabled}) => (


  
  <div className="mb-4">
    <input type="checkbox" id={id} {...register(id)}   onChange={(e) => {
        onChange(e.target.checked,e.target.id);
      
        }} disabled={disabled}/>

    <label className="ml-2" htmlFor={id}>
      {label}
    </label>
  </div>
);

export default Checkbox;
