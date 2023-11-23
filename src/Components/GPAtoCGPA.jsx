import React, { useState } from 'react';

function GPAtoCGPA() {
  const [regulation, setRegulation] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [showSem, setShowSem] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [averageGPA, setAverageGPA] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const enterGpa = () => {
    if (regulation && department && semester) {
      setShowSem(true);
      setAverageGPA(null)
      // Initialize an array with empty strings based on the selected number of semesters
      setInputValues(Array.from({ length: parseInt(semester, 10) }, () => ''));
    } else {
      setShowSem(false);
    }
  };

  const handleInputChange = (index, value) => {
      const updatedInputValues = [...inputValues];
      updatedInputValues[index] = value;
      setInputValues(updatedInputValues);
  };

  const calculateAverage = () => {
    const isNumber = inputValues.some(value => /[a-zA-Z]/.test(value));
    if (isNumber) {
      setErrorMessage('Invalid input: Please enter valid numeric values.');
    } else {
      const parsedVal = inputValues.every(value => parseFloat(value) >= 0 && parseFloat(value) <= 10);
      if (parsedVal) {
        const totalGPA = inputValues.reduce((sum, value) => sum + parseFloat(value), 0);
        const avgGPA = totalGPA / inputValues.length;
        setAverageGPA(avgGPA);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid input: Please enter numeric values between 0 and 10.');
      }
    }
  };



  return (
    <div className="shadow-2xl">
      <div>
        <h1 className="text-center pt-10 text-2xl font-semibold text-blue-600">CGPA Calculator</h1>
        <div className="m-4 pt-5 border-4 border-blue-600 grid rounded-md justify-items-center space-y-5 text-center py-3">
          <div className="border-2 border-blue-600 rounded-md w-64">
            <select className="outline-none bg-white" onChange={(e) => {
              setRegulation(e.target.value)
              setShowSem(false)
              }}name="" id="">
              <option value="">Choose Regulation</option>
              <option value="2021">Regulation 2021</option>
              <option value="2017">Regulation 2017</option>
            </select>
          </div>
          <div className="border-2 border-blue-600 rounded-md w-64">
            <select className="outline-none bg-white" onChange={(e) =>{
              setDepartment(e.target.value)
              setShowSem(false)
              }} name="" id="">
              <option value="">Choose Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MECH">MECH</option>
            </select>
          </div>
          <div className="border-2 border-blue-600 rounded-md w-64">
            <select className="outline-none bg-white" onChange={(e) => {
              setSemester(e.target.value)
              setShowSem(false)
            }} name="" id="">
              <option value="">Choose Number of Semesters</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </div>
          <div>
            <button onClick={enterGpa} className="bg-blue-600 text-white p-2 rounded-md">
              Enter GPA
            </button>
          </div>
          {showSem && (
            <div className='space-y-4'>
              <div className='grid grid-cols-1 space-y-5'>
                {inputValues.map((value, index) => (
                  <div className='flex space-x-4 md:space-x-11 px-1'>
                    <p>Enter the Sem {`${index + 1}`}</p>
                    <input
                      className='border-2 border-blue-600 rounded-md w-64 h-9 outline-none'
                      key={index}
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </div>
                ))}
                </div>
                <button onClick={calculateAverage} className="bg-blue-600 text-white p-2 rounded-md">
                  Calculate Average
                </button>
                {errorMessage? 
                  <div>
                  <p className='text-red-600 font-semibold'>{errorMessage}</p>
              </div>
              : averageGPA !== null ?
                <div>
                  <p className="font-bold">Your CGPA is : {averageGPA.toFixed(2)}</p>
                  {averageGPA <= 5 ? (
                    <p className='text-red-600 font-semibold'>Your CGPA seems low</p>
                  ) : averageGPA < 8 ? (
                    <p className='text-yellow-600 font-semibold'>Your CGPA is good </p>
                  ) : (
                    <p className='text-green-600 font-semibold'>Your CGPA is excellent </p>
                  )}
                </div>
                : null}
                {/* {averageGPA !== null && (
                  <div>
                    <p className="font-bold">Your CGPA is : {averageGPA.toFixed(2)}</p>
                    {averageGPA <= 5 ? (
                      <p className='text-red-600 font-semibold'>Your CGPA seems low</p>
                    ) : averageGPA < 8 ? (
                      <p className='text-yellow-600 font-semibold'>Your CGPA is good </p>
                    ) : (
                      <p className='text-green-600 font-semibold'>Your CGPA is excellent </p>
                    )}
                  </div>
                )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GPAtoCGPA;

