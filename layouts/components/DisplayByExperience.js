//#region Import
import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import styled from 'styled-components';
import axios from 'axios';
//#endregion

//#region Style
const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;

`;
//#endregion

//#region Hiển thị theo kinh nghiệm

// init các state
const DisplayByExperience = ({ filters }) => {
  const [experiences, setExperiences] = useState([]);
  const [jobCounts, setJobCounts] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const experiencesRes = await axios.get('/api/filters/fullkinhnghiem'); // GET các kinh nghiệm cho select
        const experiencesData = experiencesRes.data;
        console.log('Fetched experiences data:', experiencesData);
        setExperiences(experiencesData);

        const jobCountsRes = await axios.get('/api/counter/kinhnghiem2'); // GET tính tổng knghiem cho các khoảng kinh nghiệm
        const jobCountsData = jobCountsRes.data;
        console.log('Fetched job counts data:', jobCountsData);
        setJobCounts(jobCountsData);

        const jobsRes = await axios.get('/api/data', { params: filters }); // GET các tin thuộc khoảng kinh nghiệm
        const jobsData = jobsRes.data;
        console.log('Fetched jobs data:', jobsData);
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]);

  const renderJobCards = (experience) => {
    const filteredJobs = jobs.filter(job => job.ID_KinhNghiem === experience.ID_KinhNghiem); //Filter theo ID_KinhNghiem
    const count = jobCounts[experience.ID_KinhNghiem] || 0; // Đếm số job theo kinh nghiệm 
    console.log(`Rendering jobs for experience: ${experience.KinhNghiem} with count: ${count}`, filteredJobs); // print ra console

    // Trả về các section theo khoảng kinh nghiệm
    return (
      <Section key={experience.ID_KinhNghiem}>
        <Title>{experience.KinhNghiem} ({count})</Title>
        {filteredJobs.length > 0 ? (
          filteredJobs.slice(0, 2).map(job => <JobCard key={job.ID} job={job} />)
        ) : (
          <p>No jobs available for this experience</p>
        )}
        {count > 2 && <button>More...</button>}
      </Section>
    );
  };
//#endregion

  return (
    <div>
      {experiences.map(experience => renderJobCards(experience))}
    </div>
  );
};

export default DisplayByExperience;
