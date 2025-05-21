import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const StyledLink = styled(RouterLink)`
  color: ${(props) => props.color || 'var(--primary-color)'};
  text-decoration: ${(props) => props.textDecoration || 'none'};
  font-size: ${(props) => props.fontSize || '1rem'};
  font-weight: ${(props) => props.fontWeight || '400'};
  padding: ${(props) => props.padding || '0'};
  margin: ${(props) => props.margin || '0'};
  display: ${(props) => props.display || 'inline'};
  align-items: center;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.hoverColor || 'var(--primary-color-dark)'};
    text-decoration: ${(props) =>
      props.hoverDecoration || props.textDecoration || 'none'};
  }

  ${(props) => props.css}
`;

const ExternalLink = styled.a`
  color: ${(props) => props.color || 'var(--primary-color)'};
  text-decoration: ${(props) => props.textDecoration || 'none'};
  font-size: ${(props) => props.fontSize || '1rem'};
  font-weight: ${(props) => props.fontWeight || '400'};
  padding: ${(props) => props.padding || '0'};
  margin: ${(props) => props.margin || '0'};
  display: ${(props) => props.display || 'inline'};
  align-items: center;
  transition: color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.hoverColor || 'var(--primary-color-dark)'};
    text-decoration: ${(props) =>
      props.hoverDecoration || props.textDecoration || 'none'};
  }

  ${(props) => props.css}
`;

const Link = ({
  to,
  href,
  children,
  color,
  hoverColor,
  textDecoration,
  hoverDecoration,
  fontSize,
  fontWeight,
  padding,
  margin,
  display,
  css,
  ...props
}) => {
  const linkProps = {
    color,
    hoverColor,
    textDecoration,
    hoverDecoration,
    fontSize,
    fontWeight,
    padding,
    margin,
    display,
    css,
    ...props,
  };

  // If 'to' prop is provided, use RouterLink, otherwise use regular anchor
  if (to) {
    return (
      <StyledLink to={to} {...linkProps}>
        {children}
      </StyledLink>
    );
  }

  return (
    <ExternalLink href={href} {...linkProps}>
      {children}
    </ExternalLink>
  );
};

export default Link;
