import React, { useState, useEffect } from 'react';

function Subjects({ subject }) {
    const [grades, setGrades] = useState({}); // Track grades for each subject
    const [gpa, setGpa] = useState(null);
    const [showGpa, setShowGps] = useState(true)
    const [sub, setSub] = useState()
    const gpaScale = {
        '10': 10, // Grade O
        '9': 9,   // Grade A+
        '8': 8,   // Grade A
        '7': 7,   // Grade B+
        '6': 6,   // Grade B
        '5': 5,   // Grade C
        '0': 0    // Grade RA
    };
    useEffect(() => {
        setGrades({})
        setGpa(null)
        setSub(subject)
    }, [subject])

    const calculateGPA = () => {
        let totalWeightedGPA = 0;
        let finalGPA = 0
        let Tcredit = 0
        let grade = 0
        if (Object.keys(grades).length === subject.length) {
            sub.map((sub) => {
                grade = grades[sub.name];  //grades:{subName : grade}
                if (grade !== "0") {
                    Tcredit = Tcredit + sub.credits
                }
                if (grade && gpaScale[grade]) {
                    totalWeightedGPA = totalWeightedGPA + (sub.credits * gpaScale[grade]);
                }
            })
            finalGPA = (totalWeightedGPA / Tcredit).toFixed(3);
            setGpa(finalGPA)
            setShowGps(true)
        } else {
            setShowGps(false)
        }
    };

    return (
        <div className='p-2 text-sm md:text-lg font-semibold'>
            {subject && subject.length > 0 && (
                <div>
                    {subject.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between space-x-4 py-3">
                                <div className='text-start flex space-x-3'>
                                    <p>{index + 1})</p>
                                    <p className='max-md:max-w-[14rem]'>{item.code} - {item.name} ({item.credits})</p>
                                </div>
                                <div>
                                    <select name="" onChange={e => { const selectedGrade = e.target.value; setGrades(prevGrades => ({ ...prevGrades, [item.name]: selectedGrade })); }}
                                        className='select select-bordered w-full max-w-xs select-sm'>
                                        <option value='' selected={!grades[item.name]}  className='max-md:text-xs'>Choose</option>
                                        <option value="10" className='max-md:text-xs'>O</option>
                                        <option value="9" className='max-md:text-xs'>A+</option>
                                        <option value="8" className='max-md:text-xs'>A</option>
                                        <option value="7" className='max-md:text-xs'>B+</option>
                                        <option value="6" className='max-md:text-xs'>B</option>
                                        <option value="5" className='max-md:text-xs'>C</option>
                                        <option value="0" className='max-md:text-xs'>RA</option>
                                        <option value="0" className='max-md:text-xs'>No Subject</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className='bg-SecondaryGreen hover:bg-SecondaryGreen/80 text-white p-1 rounded-md' onClick={calculateGPA}>Calculate GPA</button>
                    {showGpa ? <div>
                        {gpa !== null && (
                            <div className="mt-4">
                                <p className="text-lg font-bold">Your GPA: {gpa}</p>
                            </div>
                        )}
                    </div> : <div className="mt-4">
                        <p className='text-red-700'>Choose all the grades</p>
                    </div>}
                </div>
            )}
        </div>
    );
}

export default Subjects;
