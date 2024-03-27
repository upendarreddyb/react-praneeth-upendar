import React,{useState,useRef} from 'react';
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

const WordGenerator = () => {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const contentRef = useRef(null);
    const [filter, setFilterData] = useState('all');
    const [subjectfilter, setsubjectfilter] = useState('all');
  const fetchDataAndGenerateDocument = async () => {
    try {
      // Fetch data from the backend
      const response = await axios.get(`http://localhost:4000/q/data?page=${currentPage}&limit=10&qeryfilter=${filter}&subject=${subjectfilter}`)
      console.log(response.data)
      const data = response.data.results;

      // Generate Word document based on fetched data
      const sections = [];
      data.forEach(item => {
        sections.push({
          properties: {},
          children: [
            new Paragraph({
              text: `Title: ${item.id}`,
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: `Content: ${item.question}`,
            }),
          ],
        });
      });

      const doc = new Document({
        sections: sections,
        creator: 'Your Name' // Set the creator here
      });

     // Convert the document to a blob
     const blob = await Packer.toBlob(doc);

     // Create a URL for the blob
     const url = URL.createObjectURL(blob);

     // Trigger a download
     const link = document.createElement('a');
     link.href = url;
     link.download = 'generated_document.docx';
     link.click();
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchDataAndGenerateDocument}>Generate Word Document</button>
    </div>
  );
};

export default WordGenerator;
