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
// init State
const DisplayByLevel = ({ filters }) => {
  const [levels, setLevels] = useState([]);
  const [jobCounts, setJobCounts] = useState({});
  const [jobs, setJobs] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const levelsRes = await axios.get('/api/filters/fullcapbac');// GET to endpoint show select 
        const levelsData = levelsRes.data;
        console.log('Fetched levels data:', levelsData);
        setLevels(levelsData);

        const jobCountsRes = await axios.get('/api/counter/capbac2');// GET tính số lượng
        const jobCountsData = jobCountsRes.data;
        console.log('Fetched job counts data:', jobCountsData);
        setJobCounts(jobCountsData);

        const jobsRes = await axios.get('/api/data'); // GET để hiển thị job theo cấp bậc
        const jobsData = jobsRes.data;
        console.log('Fetched jobs data:', jobsData);
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]);

  const renderJobCards = (level) => {
    const filteredJobs = jobs.filter(job => job.ID_CapBac === level.ID_CapBac); // Lọc theo ID cấp bậc 
    const count = jobCounts[level.ID_CapBac] || 0; // Set bằng 0 nếu không có 
    console.log(`Rendering jobs for level: ${level.CapBac} with count: ${count}`, filteredJobs);

    // Chia các section cho các cấp bậc
    return (
      <Section key={level.ID_CapBac}>
        <Title>{level.CapBac} ({count})</Title>
        {filteredJobs.length > 0 ? (
          filteredJobs.slice(0, 2).map(job => <JobCard key={job.ID} job={job} />)
        ) : (
          <p>No jobs available for this level</p>
        )}
        {count > 2 && <button>More...</button>}
      </Section>
    );
  };
//#endregion

  return (
    <div>
      {levels.map(level => renderJobCards(level))}
    </div>
  );
};

export default DisplayByLevel;
