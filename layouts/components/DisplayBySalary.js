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


//#region Hiển thị theo mức lương
const DisplayBySalary = ({ filters }) => {
  const [salaries, setSalaries] = useState([]);
  const [jobCounts, setJobCounts] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salariesRes = await axios.get('/api/filters/fullluong');
        const salariesData = salariesRes.data;
        console.log('Fetched salaries data:', salariesData);
        setSalaries(salariesData);

        const jobCountsRes = await axios.get('/api/counter/luong2');
        const jobCountsData = jobCountsRes.data;
        console.log('Fetched job counts data:', jobCountsData);
        setJobCounts(jobCountsData);

        const jobsRes = await axios.get('/api/data', { params: filters });
        const jobsData = jobsRes.data;
        console.log('Fetched jobs data:', jobsData);
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]);

  const renderJobCards = (salary) => {
    const filteredJobs = jobs.filter(job => job.ID_KhoangLuong === salary.KhoangLuong_ID);
    const count = jobCounts[salary.KhoangLuong_ID] || 0;
    console.log(`Rendering jobs for salary: ${salary.KhoangLuong} with count: ${count}`, filteredJobs);
//#endregion



    return (
      <Section key={salary.ID_KhoangLuong}>
        <Title>{salary.KhoangLuong} ({count})</Title>
        {filteredJobs.length > 0 ? (
          filteredJobs.slice(0, 2).map(job => <JobCard key={job.ID} job={job} />)
        ) : (
          <p>No jobs available for this salary range</p>
        )}
        {count > 2 && <button>More...</button>}
      </Section>
    );
  };

  return (
    <div>
      {salaries.map(salary => renderJobCards(salary))}
    </div>
  );
};

export default DisplayBySalary;
