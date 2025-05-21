import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { countryCodes } from '../../data/countryCodes';

const Wrapper = styled.div`
  width: 100%;
  padding: 11px 15px;
  border-radius: 5px;
  position: relative;
  background-color: white;
  box-shadow: var(--input-box-shadow-sm);
  -webkit-box-shadow: var(--input-box-shadow-sm);
  -moz-box-shadow: var(--input-box-shadow-sm);
  ${(props) =>
    props.disabled &&
    `
    background-color: #f0f0f0;
  `}
`;

const Input = styled.input`
  font-size: 14.5px;
  font-weight: 400;
  outline: none;
  background-color: transparent;
  border: none;
  padding-left: ${(props) =>
    props.type === 'text' && props.id === 'digits' ? '15px' : '0'};
  ${(props) =>
    props.disabled &&
    `
    color: #000;
    cursor: not-allowed;
    pointer-events: none;
  `}
`;

const CodeInput = styled(Input)`
  width: 15%;
  font-size: 14.5px;
  border-right: 1px solid rgb(200, 200, 200);
  @media screen and (max-width: 991px) {
    width: 20%;
  }
`;

const DigitsInput = styled(Input)`
  width: 85%;
  font-size: 14.5px;
  @media screen and (max-width: 991px) {
    width: 80%;
  }
`;

const OptionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  position: absolute;
  left: 0;
  height: 300px;
  width: 100%;
  overflow-y: scroll;
  background-color: white;
  margin-top: 15px;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 5px;
  z-index: 1000;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.li`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: var(--primary-color-500);
  }
`;

export default function Number({
  codeValue,
  digitsValue,
  codeOnChange,
  digitsOnChange,
  disabled = false,
}) {
  const [code, setCode] = useState(codeValue);
  const [isOnFocus, setIsOnFocus] = useState(false);

  const filteredCodes = countryCodes.filter((country) => {
    return `${country.country} (+${country.code})`
      .toLowerCase()
      .includes(code.toLowerCase());
  });

  const handleCodeChange = (e) => {
    if (!disabled) {
      setCode(e);
      codeOnChange({ target: { value: e } });
    }
  };

  const componentRef = useRef();

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
    <Wrapper ref={componentRef} disabled={disabled}>
      <CodeInput
        type="text"
        id="code"
        name="code"
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        onFocus={() => !disabled && setIsOnFocus(true)}
        onClick={() => !disabled && setCode('')}
        placeholder="Code"
        disabled={disabled}
      />
      <DigitsInput
        type="text"
        id="digits"
        name="digits"
        value={digitsValue}
        onChange={disabled ? undefined : digitsOnChange}
        placeholder="Number"
        disabled={disabled}
      />
      {isOnFocus && !disabled && (
        <OptionsList>
          {filteredCodes.map((country, i) => (
            <Option
              key={i}
              onClick={() => {
                handleCodeChange(`+${country.code}`);
                setIsOnFocus(false);
              }}
            >
              {country.country} (+{country.code})
            </Option>
          ))}
        </OptionsList>
      )}
    </Wrapper>
  );
}
