/*Hiển thị thống kê*/
// Import các hook React 
// Quản lý status in component &  Fetch Data
// Tạo kiểu trong component
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//#region Style
// Flex box làm container chứa
const CountersWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

// Chứa container
// Màu trắng , góc bo tròn, căn giữa, bóng mờ
const CounterBox = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
// Style tiêu đề 
const CounterTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #333;
`;

const CounterValue = styled.p`
  font-size: 2em;
  color: #0070f3;
`;
//#endregion

//#region Component Counter

const Counters = ({ filters, searchQuery }) => {
  const [counts, setCounts] = useState({
    totalJobs: 0,
    totalRecruitment: 0,
    averageSalary: 0,
    averageRecruitmentPerJob: 0,
  });

  // Fecth dữ liệu qua APi khi filter thay đổi
  useEffect(() => {
    const fetchData = async () => {
      // tạo  tham số query
      const queryParams = new URLSearchParams({ ...filters, search: searchQuery }).toString();
      const res = await fetch(`/api/data?${queryParams}`); // send đến endpoint
      const data = await res.json();
      
      // Tính toán con số
      const totalJobs = data.length;
      const totalRecruitment = data.reduce((acc, item) => acc + (item.SoLuong || 0), 0);
      const totalSalary = data.reduce((acc, item) => acc + (item.Luong || 0), 0);
      const averageSalary = totalSalary / totalJobs;
      const averageRecruitmentPerJob = totalRecruitment / totalJobs;

      // Cập nhật vào state 
      setCounts({
        totalJobs,
        totalRecruitment,
        averageSalary: isNaN(averageSalary) ? 0 : averageSalary,
        averageRecruitmentPerJob: isNaN(averageRecruitmentPerJob) ? 0 : averageRecruitmentPerJob,
      });
    };

    fetchData();
  }, [filters, searchQuery]);

  // Component trả ra 4 box để hiển thị các card
  return (
    <CountersWrapper>
      <CounterBox>
        <CounterTitle>Số lượng công việc</CounterTitle>
        <CounterValue>{counts.totalJobs}</CounterValue>
      </CounterBox>
      <CounterBox>
        <CounterTitle>Số lượng tuyển dụng</CounterTitle>
        <CounterValue>{counts.totalRecruitment}</CounterValue>
      </CounterBox>
      <CounterBox>
        <CounterTitle>Lương trung bình</CounterTitle>
        <CounterValue>{counts.averageSalary.toFixed(2)}</CounterValue>
      </CounterBox>
      <CounterBox>
        <CounterTitle>Số lượng tuyển / tin</CounterTitle>
        <CounterValue>{counts.averageRecruitmentPerJob.toFixed(2)}</CounterValue>
      </CounterBox>
    </CountersWrapper>
  );
};

export default Counters;
