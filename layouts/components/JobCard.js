import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Logo = styled.div`
  flex: 0 0 100px;
  height: 100px;
  background-color: #eee;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #aaa;
  margin-right: 16px;
`;

const Image = styled.img`
  flex: 0 0 100px;
  height: 120px;
  width: 120px;
  border-radius: 8px;
  margin-right: 16px;
  object-fit: contain; /* This will ensure the image fits within the box */
`;

const JobDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const JobTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const JobInfo = styled.p`
  margin: 4px 0;
`;

const JobCard = ({ job }) => {
  const handleCardClick = () => {
    window.location.href = job.Link;
  };

  return (
    <Card onClick={handleCardClick}>
      {job.Image ? (
        <Image src={job.Image} alt={job.TenCV.charAt(0)} />
      ) : (
        <Logo>{job.TenCV.charAt(0)}</Logo>
      )}
      <JobDetails>
        <JobTitle>{job.TenCV}</JobTitle>
        <JobInfo>{job.Nganh}</JobInfo>
        <JobInfo>{job.TinhThanh}</JobInfo>
        <JobInfo>{job.Luong}</JobInfo>
      </JobDetails>
    </Card>
  );
};

export default JobCard;
