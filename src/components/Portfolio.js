import React, { useState, useEffect, useContext } from 'react';
import './Portfolio.css'; // Import the CSS file
import { UserContext } from '../UserContext'; 

function Portfolio() {
  const { user } = useContext(UserContext);
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      
      setIsLoading(true);
      setError(null); // Clear any previous errors
  
      try {
        const response = await fetch(`http://localhost:8000/api/resumes/${user}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        console.error('Error fetching resume:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchResume();
  }, [user]);
  

  if (isLoading) {
    return <p>Loading resume...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!resumeData) {
    return <p>No resume data found.</p>;
  }

  function EducationList() {
    return (
      <div className="education-list">
        {resumeData.education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.College}</h3>
            {edu.Scores !== "Not mentioned" && edu.Scores !== "Information not available"  &&  edu.Scores!== "n/a" && <p>{edu.Scores}</p>}
            {edu.Tenure !== "Not mentioned" && edu.Tenure !== "Information not available"  &&  edu.Tenure!== "n/a" && <p>{edu.Tenure}</p>}
          </div>
        ))}
      </div>
    );
  }

  function ProjectList() {
    return (
      <div className="project-list">
        {resumeData.projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3>{project.title}</h3>
            {project.description !== "Not mentioned" && project.description !== "Information not available"  && project.description!== "n/a" && <p>{project.description}</p>}
            {project.techStack !== "Not mentioned" && project.techStack !== "Information not available"  && project.techStack!== "n/a" &&<p>Tech Stack: {project.techStack.join(', ')}</p>}
            {project.link !== "Not mentioned" && project.link!== "Information not available" && project.link!== "n/a" && <p><a href={project.link} target="_blank" rel="noopener noreferrer">Project Link</a></p>}
          </div>
        ))}
      </div>
    );
  }

  function SkillList() {
    return (
      <div className="skill-list">
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="skill-item">{skill}</div>
        ))}
      </div>
    );
  }

  function ExperienceList() {
    return (
      <div className="experience-list">
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            {exp.Role !== "Not mentioned" && exp.Role!== "Information not available" && exp.Role!== "n/a" && <h3>{exp.Role}</h3>}
            {exp.Company !== "Not mentioned" && exp.Company!== "Information not available" && exp.Company!== "n/a" &&<p>Company: {exp.Company}</p>}
            {exp.Tenure !== "Not mentioned" && exp.Tenure!== "Information not available" && exp.Tenure!== "n/a"  && <p>Tenure: {exp.Tenure}</p>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="portfolio">
      <header className="portfolio-header">
        <h1>{resumeData.name}</h1>
        <p>Full Stack Developer</p>
      </header>
      <main className="portfolio-content">
        <section id="contact">
          <h2>Contact</h2>
          <p>Phone: {resumeData.contact.phone.replace(/[^\d]/g, '')}</p> {/* Remove non-numeric characters */}
          <p>Email: <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a></p>
          <div className="contact-links">
            {resumeData.contact.links.map((link, index) => (
              <a key={index} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            ))}
          </div>
        </section>
        <section id="education">
          <h2>Education</h2>
          <EducationList />
        </section>
        <section id="projects">
          <h2>Projects</h2>
          <ProjectList />
        </section>
        <section id="skills">
          <h2>Skills</h2>
          <SkillList />
        </section>
        <section id="experience">
          <h2>Experience</h2>
          <ExperienceList />
        </section>
      </main>
    </div>
  );
}

export default Portfolio;
