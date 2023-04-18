import React, { useEffect, useState } from 'react'

export const AddStudentList = () => {
    const [fileContent, setFileContent] = useState<any>("");
    
    const handleFileUpload = (event:any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
        const content = event?.target?.result;
        setFileContent(content);
        };
        reader.readAsText(file);
    };

    useEffect(() => {
        localStorage.setItem("students", fileContent.split(', '));
    }, [fileContent])
    

    return (
        <div className='mt-5 text-center'>
        <div className="text-xl text-center mb-5"><b>Import students list</b></div>
        <input type="file" onChange={handleFileUpload} />
        <p className='mt-5 text-green-500'>{fileContent}</p>
        </div>
    );
}
