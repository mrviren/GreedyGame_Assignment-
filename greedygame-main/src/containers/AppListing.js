import React, { useEffect,useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setColumns } from "../redux/actions/tableActions";
import ProductComponent from "./ProductComponent";

const AppListing = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const products = useSelector((state) => state.allColumns.columns);
  const dispatch = useDispatch();
  const url = "http://go-dev.greedygame.com/v3/dummy/report?startDate="+ startDate + "&endDate="+ endDate ;
  const fetchProducts = async () => {
    const response = await axios
      .get(url)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setColumns(response.data.data));
  };

  useEffect(() => {
    fetchProducts();
  }, [url]);

  return (
    <>
      <div style={{textAlign: 'center'}}>
        <h2 >Analytics</h2>
        <label >select Start Date</label> 
      <br/>
      <input type="date" value={startDate} onChange={(e)=> setStartDate(e.target.value)} />
      <br/>
      <label>select End Date </label>
      <br/>
      <input type="date" value={endDate} onChange={(e)=> setEndDate(e.target.value)} />
      <br/>
      </div>
      <div className="ui ">
        <ProductComponent />
      </div>
    </>
  );
};

export default AppListing;
