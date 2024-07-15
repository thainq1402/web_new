import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const ChartItem = styled.div`
  flex: 1 1 22%;
  max-width: 22%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PieChartContainer = styled.div`
  width: 100%;
  height: 350px; /* Fixed height for all charts */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items vertically */
`;

const Title = styled.div`
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
`;

const PieCharts = ({ filters, searchQuery }) => {
  const [regionData, setRegionData] = useState({ labels: [], datasets: [] });
  const [levelData, setLevelData] = useState({ labels: [], datasets: [] });
  const [experienceData, setExperienceData] = useState({ labels: [], datasets: [] });
  const [salaryData, setSalaryData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({ ...filters, search: searchQuery }).toString();

        const regionRes = await fetch(`/api/counter/khuvuc?${queryParams}`);
        const regionCounts = await regionRes.json();
        setRegionData({
          labels: Object.keys(regionCounts),
          datasets: [{
            data: Object.values(regionCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
        });

        const levelRes = await fetch(`/api/counter/capbac?${queryParams}`);
        const levelCounts = await levelRes.json();
        setLevelData({
          labels: Object.keys(levelCounts),
          datasets: [{
            data: Object.values(levelCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          }]
        });

        const experienceRes = await fetch(`/api/counter/kinhnghiem?${queryParams}`);
        const experienceCounts = await experienceRes.json();
        setExperienceData({
          labels: Object.keys(experienceCounts),
          datasets: [{
            data: Object.values(experienceCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          }]
        });

        const salaryRes = await fetch(`/api/counter/luong?${queryParams}`);
        const salaryCounts = await salaryRes.json();
        setSalaryData({
          labels: Object.keys(salaryCounts),
          datasets: [{
            data: Object.values(salaryCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }]
        });
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, [filters, searchQuery]);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 10 // Adjust legend font size here
          },
          boxWidth: 10 // Adjust legend box size here
        }
      }
    },
    maintainAspectRatio: false, // Ensure chart maintains aspect ratio
    responsive: true,
    layout: {
      padding: {
        top: 10, // Add padding to the top of the chart
        bottom: 10 // Add padding to the bottom of the chart to accommodate the legend
      }
    }
  };

  return (
    <ChartsWrapper>
      <ChartItem>
        <Title>Phân bố CV theo miền</Title>
        <PieChartContainer>
          <Pie data={regionData} options={options} />
        </PieChartContainer>
      </ChartItem>
      <ChartItem>
        <Title>Phân bố CV theo cấp bậc</Title>
        <PieChartContainer>
          <Pie data={levelData} options={options} />
        </PieChartContainer>
      </ChartItem>
      <ChartItem>
        <Title>Phân bố CV theo kinh nghiệm</Title>
        <PieChartContainer>
          <Pie data={experienceData} options={options} />
        </PieChartContainer>
      </ChartItem>
      <ChartItem>
        <Title>Phân bố CV theo khoảng lương</Title>
        <PieChartContainer>
          <Pie data={salaryData} options={options} />
        </PieChartContainer>
      </ChartItem>
    </ChartsWrapper>
  );
};

export default PieCharts;
