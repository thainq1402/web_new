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


//#region Hiển thị theo loại hình 
const DisplayByType = ({ filters }) => {
  const [types, setTypes] = useState([]);
  const [jobCounts, setJobCounts] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesRes = await axios.get('/api/filters/fullloaihinh');
        const typesData = typesRes.data;
        console.log('Fetched types data:', typesData);
        setTypes(typesData);

        const jobCountsRes = await axios.get('/api/counter/loaihinh');
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

  const renderJobCards = (type) => {
    const filteredJobs = jobs.filter(job => job.ID_LoaiHinh === type.ID_LoaiHinh);
    const count = jobCounts[type.ID_LoaiHinh] || 0;
    console.log(`Rendering jobs for type: ${type.LoaiHinh} with count: ${count}`, filteredJobs);
//#endregion


    return (
      <Section key={type.ID_LoaiHinh}>
        <Title>{type.LoaiHinh} ({count})</Title>
        {filteredJobs.length > 0 ? (
          filteredJobs.slice(0, 2).map(job => <JobCard key={job.ID} job={job} />)
        ) : (
          <p>No jobs available for this type</p>
        )}
        {count > 2 && <button>More...</button>}
      </Section>
    );
  };


  return (
    <div>
      {types.map(type => renderJobCards(type))}
    </div>
  );
};

export default DisplayByType;
