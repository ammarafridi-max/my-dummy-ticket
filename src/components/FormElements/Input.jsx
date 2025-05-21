import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: white;
  font-weight: 500;
  padding: 0 15px;
  border-radius: 5px;
  transition-duration: 0.3s;
  box-shadow: var(--input-box-shadow-sm);
  -webkit-box-shadow: var(--input-box-shadow-sm);
  -moz-box-shadow: var(--input-box-shadow-sm);
  &:hover,
  &:focus-within {
    border-color: var(--primary-color-500);
  }
  @media only screen and (max-width: 991px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const Icon = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  & * {
    font-size: 15px;
  }
`;

const InputField = styled.input`
  width: 95%;
  background-color: transparent;
  border: none;
  font-size: 14.5px;
  outline: none;
  padding: 12px 0;
  &::placeholder {
    color: rgb(150, 150, 150);
    font-size: 14px;
  }
`;

export default function Input({
  icon,
  type,
  placeholder,
  value,
  style,
  onClick,
  onChange,
  onFocus,
  id,
  name,
  autoComplete,
  pattern,
  min,
  max,
  className,
  disabled,
}) {
  return (
    <Wrapper style={style}>
      {icon && <Icon>{icon}</Icon>}
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        id={id}
        name={name}
        autoComplete={autoComplete}
        pattern={pattern}
        min={min}
        max={max}
        disabled={disabled}
        className={className}
      />
    </Wrapper>
  );
}
