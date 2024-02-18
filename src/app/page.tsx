// page.tsx

import RegistrationForm from "./components/RegistrationForm";

export default function Page() {
  
  return (
          <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4" >רישום לערב צוות</h2>
    <RegistrationForm />
  </div>
  );
}

