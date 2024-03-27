
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QuestionCard from './QuestionCard';
import { Button, Select, Option, } from "@material-tailwind/react";

const GetAllAuestions = () => {

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const contentRef = useRef(null);
    const [filter, setFilterData] = useState('all');
    const [subjectfilter, setsubjectfilter] = useState('all');

    const getSubjectType = (e) => {
        console.log("onachnage ", e);
        setsubjectfilter(e);
    }

    useEffect(() => {
        fetchData();
    }, [currentPage, filter, subjectfilter]);

    const fetchData = async () => {
        console.log("ofeter set value", subjectfilter)
        await axios.get(`http://localhost:4000/q/data?page=${currentPage}&limit=10&qeryfilter=${filter}&subject=${subjectfilter}`)
            .then(response => {
                setData(response.data.results);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDownloadPDF = async () => {
        const input = contentRef.current;
        console.log(input)
        await html2canvas(input, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            pdf.save('questions.pdf');
        });
    };

    const getFilterdData = (event) => {
        setFilterData(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="bg-purple-200 h-16" >
                <div className="flex  justify-between">
                    <div></div>
                    <div className="p-4">
                        <ul className="flex flex-wrap space-x-6">
                            <li>
                                <Select variant="outlined" name="subject" value={subjectfilter} label="Select Subject" onChange={getSubjectType} >
                                    <Option value="all">All</Option>
                                    <Option value="maths">Maths</Option>
                                    <Option value="physics">Physics</Option>
                                    <Option value="english">English</Option>
                                </Select>
                            </li>

                            <li>
                                <Button variant="outlined" value="easy" onClick={getFilterdData}>Easy</Button>
                            </li>
                            <li>
                                <Button variant="outlined" value="medium" onClick={getFilterdData}>Medium</Button>
                            </li>
                            <li>
                                <Button variant="outlined" value="hard" onClick={getFilterdData}>Hard</Button>
                            </li>
                        </ul>
                    </div>
                    <div onClick={handleDownloadPDF} className='cursor-pointer'>
                        <div >



                            <small className="p-2 w-14 h-96 ">pdf download⬇️</small>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container mx-auto p-4" id="content-to-download" ref={contentRef}>
                {data.map(item => (
                    <div key={item.id} >
                        <div className=''>
                            <QuestionCard qData={item} />
                        </div>
                        <div className="py-2">
                        </div>
                    </div>
                ))}
            </div>
            <div className="container mx-auto p-4">
                <ul className="flex items-right justify-end">
                    <li>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-l cursor-pointer"
                            onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
                    </li>
                    {[...Array(totalPages).keys()].map((page) => (
                        <li key={page}>
                            <button className={`mx-1 px-3 py-2 rounded ${page + 1 === currentPage ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-700'}`}
                                onClick={() => setCurrentPage(page + 1)}>{page + 1}</button>
                        </li>
                    ))}
                    <li>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-r cursor-pointer"
                            onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default GetAllAuestions
