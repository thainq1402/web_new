//#region Import
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
//#endregion

//#region Style
const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FilterLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 20vw;
  font-size: 14px;
`;
//#endregion

//#region Filter 
const Filters = ({ onChange, onDisplayChange }) => {
  // init state 
  const [capbac, setCapbac] = useState([]);
  const [kinhnghiem, setKinhnghiem] = useState([]);
  const [loaihinh, setLoaihinh] = useState([]);
  const [tinhthanh, setTinhthanh] = useState([]);
  const [khuvuc, setKhuvuc] = useState([]);
  const [khoangluong, setKhoangluong] = useState([]);
  const [selectedFilterType, setSelectedFilterType] = useState("none");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const capbacRes = await axios.get("/api/filters/capbac");
        console.log("capbac:", capbacRes.data); // Debugging line
        setCapbac(capbacRes.data);

        const kinhnghiemRes = await axios.get("/api/filters/kinhnghiem");
        console.log("kinhnghiem:", kinhnghiemRes.data); // Debugging line
        setKinhnghiem(kinhnghiemRes.data);

        const loaihinhRes = await axios.get("/api/filters/loaihinh");
        console.log("loaihinh:", loaihinhRes.data);
        setLoaihinh(loaihinhRes.data);

        const tinhthanhRes = await axios.get("/api/filters/tinhthanh");
        console.log("tinhthanh:", tinhthanhRes.data);
        setTinhthanh(tinhthanhRes.data);

        const khuvucRes = await axios.get("/api/filters/khuvuc");
        console.log("khuvuc:", khuvucRes.data);
        setKhuvuc(khuvucRes.data);

        const khoangluongRes = await axios.get("/api/filters/khoangluong");
        console.log("khoangluong:", khoangluongRes.data);
        setKhoangluong(khoangluongRes.data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchData();
  }, []);

  const renderOptions = (data) => {
    if (!Array.isArray(data)) {
      console.error("Expected an array but received:", data);
      return null;
    }
//#endregion

    return data.map((item, index) => (
      <option key={index} value={item}>
        {item}
      </option>
    ));
  };

  return (
    <FiltersWrapper>
      <FiltersRow>
        <FilterBox>
          <FilterLabel>Chế độ hiển thị</FilterLabel>
          <FilterSelect
            onChange={(e) => {
              setSelectedFilterType(e.target.value);
              onDisplayChange(e.target.value);
            }}
          >
            <option value="none">Hiển thị tất cả</option>
            <option value="khuvuc">Hiển thị theo khu vực</option>
            <option value="tinhthanh">Hiển thị theo thành phố</option>
            <option value="capbac">Hiển thị theo cấp bậc</option>
            <option value="luong">Hiển thị theo lương</option>
            <option value="kinhnghiem">Hiển thị theo kinh nghiệm</option>
            <option value="loaihinh">Hiển thị theo loại hình</option>
          </FilterSelect>
        </FilterBox>
      </FiltersRow>
      <FiltersRow>
        <FilterBox>
          <FilterLabel>Chọn Khu vực</FilterLabel>
          <FilterSelect onChange={(e) => onChange("khuvuc", e.target.value)}>
            <option value="">Select Khu vực</option>
            {renderOptions(khuvuc)}
          </FilterSelect>
        </FilterBox>
        <FilterBox>
          <FilterLabel>Chọn Thành phố</FilterLabel>
          <FilterSelect onChange={(e) => onChange("tinhthanh", e.target.value)}>
            <option value="">Select Thành phố</option>
            {renderOptions(tinhthanh)}
          </FilterSelect>
        </FilterBox>
        <FilterBox>
          <FilterLabel>Chọn Cấp bậc</FilterLabel>
          <FilterSelect onChange={(e) => onChange("capbac", e.target.value)}>
            <option value="">Select Cấp bậc</option>
            {renderOptions(capbac)}
          </FilterSelect>
        </FilterBox>
        <FilterBox>
          <FilterLabel>Chọn Kinh nghiệm</FilterLabel>
          <FilterSelect onChange={(e) => onChange("kinhnghiem", e.target.value)}>
            <option value="">Select Kinh nghiệm</option>
            {renderOptions(kinhnghiem)}
          </FilterSelect>
        </FilterBox>
        <FilterBox>
          <FilterLabel>Chọn Loại hình</FilterLabel>
          <FilterSelect onChange={(e) => onChange("loaihinh", e.target.value)}>
            <option value="">Select Loại hình</option>
            {renderOptions(loaihinh)}
          </FilterSelect>
        </FilterBox>
        <FilterBox>
          <FilterLabel>Chọn Khoảng lương</FilterLabel>
          <FilterSelect onChange={(e) => onChange("khoangluong", e.target.value)}>
            <option value="">Select Khoảng lương</option>
            {renderOptions(khoangluong)}
          </FilterSelect>
        </FilterBox>
      </FiltersRow>
    </FiltersWrapper>
  );
};

export default Filters;
