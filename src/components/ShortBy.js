import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import styled from "styled-components";
import { setSelectedCountries, setSelectedLanguage } from "../store/actions";
import { useDispatch } from "react-redux";


const SortBy = ({ options,action }) => {
  const dispatch = useDispatch()
  const [option, setOption] = useState(options[0]);
  function handleChange(selectedOption) {
    setOption(selectedOption);
  }

  useEffect(() => {
    if(action==="country" && option!==""){

      dispatch(setSelectedCountries(option));
      return () => {
        dispatch(setSelectedCountries())
      }
    }else{
      dispatch(setSelectedLanguage(option));
      return () => {
        dispatch(setSelectedLanguage());
      };
    }
  }, [action, dispatch, option])

  const SelctWrap = styled(Select)`
  width:15rem;
  margin-right:1rem;
  `

  return (
    <SelctWrap
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        width: "100",
        colors: {
          ...theme.colors,
          primary25: "var(--color-primary-lighter)",
          primary: "var(--color-primary)",
        },
      })}
      value={option}
      onChange={handleChange}
      options={options}
      defaultValue={options[0]}
      isSearchable={false}
      aria-label="searchlabel"
    />
  );
};


export default SortBy;
