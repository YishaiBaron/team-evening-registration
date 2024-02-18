'use client'
// components/RegistrationForm.tsx
import React, { useEffect ,useState} from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import Checkbox from './Checkbox';
import SelectField from './SelectField';
import Popup from './Popup';
import axios, { AxiosError } from 'axios';
 
const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit
  } = useForm();

  const employees = ["Alice","Bob","Caroline","Dave"]; //Example employees
  const numbers = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //Numbers Arrays for transportation
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [spouseJoining,  setSpouseJoining] = useState(false);
  const [childrenJoining,  setChildrenJoining] = useState(0);
  const [childrenOver18,  setChildrenOver18] = useState(0);
  const [shabbatObservance,  setShabbatObservance] = useState(false);
  const [numberOfRooms,  setNumberOfRooms] = useState(1);
  const [personsArriving,  setPersonsArriving] = useState(0);
  const [transportation,  setTransportation] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openFlag, setOpenFlag] = useState(false);
  const [connectingDoorFlag, setConnectingDoorFlag] = useState(false);
  const [apiValidationPassed, setApiValidationPassed] = useState<boolean | null>(null);
  const [apiValidationMsg, setApiValidationMsg] = useState('');

  

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const handleInputChange = (value: any, id: string) => {
    if (id === 'spouseJoining') {
      setSpouseJoining(value);
    } else if (id === 'childrenJoining') {
      setChildrenJoining(value);
    } else if (id === 'childrenOver18') {
      setChildrenOver18(value);
    } else if (id === 'shabbatObservance') {
      setShabbatObservance(value);
    } else if (id === 'numberOfRooms') {
      setNumberOfRooms(value);
    } else if (id === 'personsArriving') {
      setPersonsArriving(value);
    }  else if (id === 'transportation') {
      setTransportation(value);
    }
  };

useEffect(() => {
  // Calculate total price whenever data changes
  calculateTotalPrice();
}, [
  spouseJoining,
  childrenJoining,
  childrenOver18,
  shabbatObservance,
  numberOfRooms,
  transportation,
]);

  const calculateTotalPrice = () => {
    let total = 500;
    if (spouseJoining) {
      total += 100; // Additional fee for spouse
    }
    if (childrenJoining) {
      total += (childrenJoining) * 50; // Fee per child joining
    }
    if (childrenOver18) {
      total += (childrenOver18) * 250; // Fee per 18+ child joining
    }
    if (transportation) {
      total += (transportation) * 25; // Fee per transportation
    }

    if(spouseJoining || childrenJoining || childrenOver18)
 {
 total +=  20 * (childrenOver18 ) + 20 * (spouseJoining ? 1 : 0) + 10 * childrenJoining  //Fee per Participation in a team evening
 }
total += (numberOfRooms > 1 ? 500 * (numberOfRooms - 1) : 0)
total = (shabbatObservance? total - (total * 0.18) : total)

let totalPerson = Number(childrenOver18) + Number(childrenJoining) + (spouseJoining ? 1 : 0) + 1; // Total persons
if (totalPerson >= 5 && !openFlag) 
{
  setIsOpen(!isOpen) // Notice about an option to register for a basketball tournament
  setOpenFlag(true)
}

if (totalPerson < 5) 
{  
  setOpenFlag(false)
}

setPersonsArriving(totalPerson)
if (numberOfRooms > 1)  setConnectingDoorFlag(false) 
else setConnectingDoorFlag(true) 
    setTotalPrice(total);
  };


  
  const onSubmit = async (data: any) => { //The data will be sent to the API, which will check the validation and return feedback whether the validation passed or not. 

    try {
      const response = await axios.post('/api/webhooks/route', data);
      setApiValidationPassed(true);
      setApiValidationMsg(response.data.message);
     console.log(response.data.message);

    } catch (error) {
      console.error(error);
     
      if (error instanceof AxiosError) 
      setApiValidationMsg(error.response?.data.message);
              setApiValidationPassed(false);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >

 {/* Feedback message based on API validation */}
 {apiValidationPassed  !== null  && (
        <p className={apiValidationPassed ? "text-green-500" : "text-red-500"}>
          {apiValidationMsg}
        </p>
      )}

<SelectField label="בחירת עובד" id="employee" options={employees} register={register} onChange={handleInputChange}/>
<Checkbox label="הצטרפות בן/בת זוג" id="spouseJoining" register={register}  onChange={handleInputChange} disabled={false} />
<InputField label="כמות ילדים המצטרפים" type="number" id="childrenJoining" register={register} onChange={handleInputChange}   />
<InputField label="כמות ילדים מעל גיל 18" type="number" id="childrenOver18" register={register} onChange={handleInputChange}  />
<Checkbox label=" שמירת שבת" id="shabbatObservance" register={register} onChange={handleInputChange} disabled={false}/>
<SelectField label="מספר חדרים" id="numberOfRooms" options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} register={register} onChange={handleInputChange} />
<p className="text-lg font-semibold">מס' הנפשות המגיעות: {personsArriving} </p>
<Checkbox label=" צורך בדלת מקשרת" id="connectingDoor" register={register} onChange={handleInputChange} disabled={connectingDoorFlag}/>
<SelectField label="צורך בהסעה ומספר מקומות" id="transportation"  options={numbers} register={register} onChange={handleInputChange}/>


{isOpen && <Popup
      content={<>
        <b>הודעה</b>
        <p>אפשר להירשם לטורניר כדורסל!</p>
      </>}
      handleClose={togglePopup}
    />}
 
      <div className="text-center mt-4">
        
        <p className="text-lg font-semibold">סה"כ מחיר: {totalPrice} ₪ </p>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full mt-4"
      >
        שליחה
      </button>
    </form>
  );
};

export default RegistrationForm;

