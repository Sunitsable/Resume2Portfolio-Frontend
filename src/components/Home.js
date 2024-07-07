import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { UserContext } from '../UserContext';

function Home() {
  const { user } = useContext(UserContext);
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!resumeFile) {
      alert('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('userId', user); // Add the user ID to the form data
  
    try {
      setIsLoading(true); // Set loading to true when form is submitted
  
      const response = await fetch('http://localhost:8000/api/resumes/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      navigate('/portfolio');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false); // Reset loading state after form submission
    }
  };

  return (
    <div>
      <h1>Hello, {user}</h1>
      <h1>Upload Your Resume</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {isLoading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )} {/* Spinner */}
      {isLoading && (<div className="t">Please wait ,it will take a moment to make your portfolio !!</div>)}
    </div>
  );
}

export default Home;
