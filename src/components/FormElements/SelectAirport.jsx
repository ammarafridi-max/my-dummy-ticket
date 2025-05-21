import React, { useState, useEffect, useRef } from 'react';
import { baseURL } from '../../config';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0px 15px;
  border-radius: var(--input-radius-md);
  transition-duration: 0.3s;
  position: relative;
  margin: 0;
  box-shadow: var(--input-box-shadow);
  -webkit-box-shadow: var(--input-box-shadow);
  -moz-box-shadow: var(--input-box-shadow);
  &:focus-within {
    box-shadow: var(--input-box-shadow-focus);
    -webkit-box-shadow: var(--input-box-shadow-focus);
    -moz-box-shadow: var(--input-box-shadow-focus);
  }
`;

const Icon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  padding: 12px 15px;
  font-weight: 500;
  padding-right: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
  }
`;

const List = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 300px;
  padding-left: 0;
  overflow-y: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 1000;
  & li {
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: left;
    list-style-type: none;
    font-size: 14px;
  }
  li:hover {
    background-color: var(--primary-color-500);
    color: #fff;
  }
`;

const Text = styled.li`
  color: #666;
  text-align: center;
  padding: 10px;
`;

export default function SelectAirport({ value, onChange, id, icon }) {
  const [query, setQuery] = useState(value || '');
  const [selectedAirport, setSelectedAirport] = useState(value || null);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [airports, setAirports] = useState([]);
  const componentRef = useRef();

  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsOnFocus(true);
    onChange(null);
  };

  const handleClick = () => {
    setQuery(' ');
    setIsOnFocus(true);
  };

  const handleItemClick = (airport) => {
    setQuery(`${airport.address.cityName} (${airport.iataCode})`);
    setSelectedAirport(airport);
    setIsOnFocus(false);
    onChange(`${airport.address.cityName} (${airport.iataCode})`);
  };

  useEffect(() => {
    async function fetchAirports() {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseURL}/api/airports?keyword=${query}`);
        const data = await res.json();
        setAirports(data?.result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.trim().length >= 3) {
      fetchAirports();
    } else {
      setAirports([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsOnFocus(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={componentRef}>
      <Wrapper>
        {icon && <Icon>{icon}</Icon>}
        <Input
          id={id}
          type="text"
          value={query}
          onChange={handleChange}
          onClick={handleClick}
          placeholder="Search airport or city..."
        />
      </Wrapper>
      {isOnFocus && (
        <List>
          {isLoading && <Text>Loading airports...</Text>}

          {query?.length < 3 && !isLoading && (
            <Text>Enter at least 3 characters</Text>
          )}

          {airports?.length === 0 && query?.length > 3 && !isLoading && (
            <Text>No airports found</Text>
          )}

          {!isLoading &&
            airports?.length > 0 &&
            airports?.map((airport) => (
              <li
                key={airport.iataCode}
                onClick={() => handleItemClick(airport)}
              >
                {airport.address.cityName} ({airport.iataCode})
              </li>
            ))}
        </List>
      )}
    </div>
  );
}
