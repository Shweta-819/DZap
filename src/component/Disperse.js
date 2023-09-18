/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState } from 'react';
import findStringsWithDuplicateFirstParts from '../utils.ls/findStringsWithDuplicateFirstParts'
import combineBalances from '../utils.ls/combinesBalances';
import keepFirstOne from '../utils.ls/keepFirstOne';

const isValidData = (data) => (/^[a-zA-Z0-9]+(?:,| |=)[0-9]+$/).test(data);

const useInputRefs = (count) => {
    const refs = [];

    for (let i = 0; i < count; i++) {
        refs.push({
            dataRef: useRef(null),
        });
    }
    return refs;
};

const Disperse = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const inputRefs = useInputRefs(4);


    const deleteArray = inputRefs.map(refGroup => refGroup.dataRef);

    const lineLabels = ["1.", "2.", "3.", "4."];
    let dataArray = [];

    const duplicates = findStringsWithDuplicateFirstParts(dataArray);
    keepFirstOne(deleteArray, duplicates)

    const onSubmit = (e) => {
        e.preventDefault();
        const errorMessages = [];
        for (let i = 0; i < inputRefs.length; i++) {

            dataArray.push(inputRefs[i].dataRef.current.value)

            const dataValue = inputRefs[i].dataRef.current.value;

            if (!isValidData(dataValue)) {
                errorMessages.push(`Line ${i + 1} has wrong input`);
            }

            const duplicates = findStringsWithDuplicateFirstParts(dataArray);
            keepFirstOne(deleteArray, duplicates)

            
            if (duplicates.length > 0) {
                duplicates.forEach((duplicate) => {
                    errorMessages.push(`Address ${duplicate.str} encountered duplicate  line :  ${duplicate.lineNumbers.join(', ')}`);
                });
            }


            if (errorMessages.length > 0) {
                setErrorMessage(errorMessages.join('\n'));
            } else {
                setErrorMessage('Submitted Successfully!');
            }
        };
        const combinedData = combineBalances(dataArray);

            if (combinedData.length > 0) {
                dataArray = combinedData;
                inputRefs.forEach((refGroup, index) => {
                    if (index < combinedData.length) {
                        refGroup.dataRef.current.value = combinedData[index];
                    }
                });
            }


    }
    return (
        <div className="box">
            <h1>Disperse</h1>
            <form onSubmit={onSubmit}>
                {inputRefs.map((refGroup, index) => (
                    <div className="data" key={index}>
                        <h3>{lineLabels[index]}</h3>
                        <input type="text" placeholder="Enter" ref={refGroup.dataRef} className='input' />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {errorMessage ? (
                <>
                    <div className="error">
                        <h4>Duplicated</h4>
                        <div className="error">
                            <h4> <button type="button" Click={() => keepFirstOne(deleteArray, duplicates)}>Keep the first</button> </h4>
                            <div className='line'>|</div>

                            <h4> <button type="button" onClick={() => combineBalances(dataArray)}>Combine Balance</button> </h4>

                        </div>
                    </div><p className="text">{errorMessage}</p></>) : null}


        </div>
    );
};

export default Disperse;
