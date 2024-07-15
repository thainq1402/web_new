import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getSinglePage } from "@lib/contentParser";
import Counters from "@layouts/components/Counters";
import Filters from "@layouts/components/Filters";
import PieCharts from "@layouts/components/PieCharts";
import DisplayByLevel from "@layouts/components/DisplayByLevel";
import DisplayByExperience from "@layouts/components/DisplayByExperience";
import DisplayByType from "@layouts/components/DisplayByType";
import DisplayByRegion from "@layouts/components/DisplayByRegion";
import DisplayBySalary from "@layouts/components/DisplayBySalary";
import DisplayByCity from "@layouts/components/DisplayByCity";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import JobCard from "@layouts/components/JobCard";
const { blog_folder, pagination } = config.settings;

const BlogPagination = ({ initialJobs, authors, currentPage, totalJobs, pagination }) => {
  const [jobs, setJobs] = useState(initialJobs || []);
  const [filters, setFilters] = useState({});
  const [selectedDisplayType, setSelectedDisplayType] = useState("none");
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null); // Ref to keep track of the search input

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage, filters, searchQuery]);

  const fetchJobs = async (page) => {
    const queryParams = new URLSearchParams({ page, limit: pagination, ...filters, search: searchQuery }).toString();
    console.log("Fetching jobs with params:", queryParams);
    try {
      const response = await axios.get(`/api/data_lake?${queryParams}`);
      console.log("Fetched jobs:", response.data);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleFilterChange = (filter, value) => {
    console.log(`Filter change - ${filter}: ${value}`);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  const handleDisplayTypeChange = (type) => {
    console.log("Selected display type:", type);
    setSelectedDisplayType(type);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInputRef.current.value);
  };

  const Title = styled.div`
    font-size: 34px;
    font-weight: 600;
    color: black;
  `;

  const UpperSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f9fa;
  `;

  const SearchForm = styled.form`
    display: flex;
    width: 50%;
  `;

  const SearchInput = styled.input`
    width: 80%;
    padding: 10px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
  `;

  const SearchButton = styled.button`
    width: 20%;
    padding: 10px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-left: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    background-color: #007bff;
    color: white;
  `;

  const renderDisplayComponent = () => {
    console.log("Render component with jobs:", jobs);
    switch (selectedDisplayType) {
      case "none":
        return jobs.slice(0, 10).map((job) => <JobCard key={job.ID} job={job} />);
      case "capbac":
        return <DisplayByLevel filters={filters} />;
      case "kinhnghiem":
        return <DisplayByExperience filters={filters} />;
      case "loaihinh":
        return <DisplayByType filters={filters} />;
      case "khuvuc":
        return <DisplayByRegion filters={filters} />;
      case "tinhthanh":
        return <DisplayByCity filters={filters} />;
      case "luong":
        return <DisplayBySalary filters={filters} />;
      default:
        return null;
    }
  };

  return (
    <Base>
      <UpperSection>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder="Search Job by Name"
            ref={searchInputRef} // Keep track of the input with ref
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>
      </UpperSection>
      <section className="section">
        <div className="container">
          <Counters filters={filters} searchQuery={searchQuery} />
          <Filters onChange={handleFilterChange} onDisplayChange={handleDisplayTypeChange} />
          <PieCharts filters={filters} searchQuery={searchQuery} />
          <div className="charts">
            {/* Add more charts as needed */}
          </div>
          <Title>Job</Title>
          {renderDisplayComponent()}
          <Pagination totalPages={Math.ceil(totalJobs / pagination)} currentPage={currentPage} />
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

export const getStaticPaths = async () => {
  const totalJobs = await axios
    .get('http://localhost:3000/api/data_lake/total')
    .then((response) => response.data)
    .catch(() => 0);

  const totalPages = Math.ceil(totalJobs / pagination);
  let paths = [];

  for (let i = 1; i <= totalPages; i++) {
    paths.push({
      params: {
        slug: i.toString(),
      },
    });
  }

  return {
    paths,
    fallback: 'blocking', // Use blocking to allow dynamic pages to be generated
  };
};

export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);

  const jobs = await axios
    .get(`http://localhost:3000/api/data_lake`, {
      params: { page: currentPage, limit: pagination },
    })
    .then((response) => response.data)
    .catch(() => []);

  const totalJobs = await axios
    .get(`http://localhost:3000/api/data_lake/total`)
    .then((response) => response.data)
    .catch(() => 0);

  const authors = getSinglePage("content/authors");

  return {
    props: {
      initialJobs: jobs,
      authors: authors,
      currentPage: currentPage,
      totalJobs: totalJobs,
      pagination: pagination,
    },
    revalidate: 1, // Regenerate the page every second if a request comes in
  };
};
