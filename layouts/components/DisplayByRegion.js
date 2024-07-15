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
`;
//#endregion

//#region Hiển thị theo khu vực
const DisplayByRegion = () => {
  const [jobsByRegion, setJobsByRegion] = useState({ north: [], south: [], central: [], other: [] });
  const [jobCounts, setJobCounts] = useState({ north: 0, south: 0, central: 0, other: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await axios.get('/api/jobsByRegion');
        const jobsData = jobsResponse.data;
        console.log('Fetched jobs by region data:', jobsData);
        setJobsByRegion(jobsData);

        const countsResponse = await axios.get('/api/counter/khuvuc');
        const countsData = countsResponse.data;
        console.log('Fetched job counts data:', countsData);
        setJobCounts({
          north: countsData['Bắc'] || 0,
          south: countsData['Nam'] || 0,
          central: countsData['Trung'] || 0,
          other: countsData['Khác'] || 0,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderJobSection = (title, jobs, count) => (
    <Section key={title}>
      <Title>{title} ({count})</Title>
      {jobs.length > 0 ? (
        jobs.map(job => <JobCard key={job.ID} job={job} />)
      ) : (
        <p>No jobs available for this region</p>
      )}
    </Section>
  );
//#endregion

  return (
    <div>
      {renderJobSection('North', jobsByRegion.north, jobCounts.north)}
      {renderJobSection('South', jobsByRegion.south, jobCounts.south)}
      {renderJobSection('Central', jobsByRegion.central, jobCounts.central)}
      {renderJobSection('Other', jobsByRegion.other, jobCounts.other)}
    </div>
  );
};

export default DisplayByRegion;
