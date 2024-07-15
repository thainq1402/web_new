// Hiển thị theo thành phố

//#region Import 

import React, { useEffect, useState } from 'react';
import JobCard from './JobCard'; // Hiển thị thông tin công việc
import styled from 'styled-components';
import axios from 'axios'; // Xử lý các yêu cầu HTTP
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

//#region Component Display theo thành phố

const DisplayByCity = ({ filters }) => {
  const [cities, setCities] = useState([]);
  const [jobCounts, setJobCounts] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesRes = await axios.get('/api/filters/fullthanhpho'); // GET
        const citiesData = citiesRes.data;
        console.log('Fetched cities data:', citiesData);
        setCities(citiesData);

        const jobCountsRes = await axios.get('/api/counter/thanhpho'); // GET
        const jobCountsData = jobCountsRes.data;
        console.log('Fetched job counts data:', jobCountsData);
        setJobCounts(jobCountsData);

        const jobsRes = await axios.get('/api/data', { params: filters }); // GET
        const jobsData = jobsRes.data;
        console.log('Fetched jobs data:', jobsData);
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]);
//#region hàm Render 
  const renderJobCards = (city) => {
    const filteredJobs = jobs.filter(job => job.ID_TinhThanh === city.ID_TinhThanh); // Lọc theo ID
    const count = jobCounts[city.ID_TinhThanh] || 0; //
    console.log(`Rendering jobs for city: ${city.TinhThanh} with count: ${count}`, filteredJobs);
//#endregion

//#region 
    return (
      <Section key={city.ID_TinhThanh}>
        <Title>{city.TinhThanh} ({count})</Title>
        {filteredJobs.length > 0 ? (
          filteredJobs.slice(0, 2).map(job => <JobCard key={job.ID} job={job} />)// Hiển thị 2 jobs rồi bấm xem thêm
        ) : (
          <p>No jobs available for this city</p>
        )}
        {count > 2 && <button>More...</button>}
      </Section>
    );
  };

  // Mỗi section hiển thị công việc cho từng thành phố
  return (
    <div>
      {cities.map(city => renderJobCards(city))}
    </div>
  );
};
//#endregion
export default DisplayByCity;
