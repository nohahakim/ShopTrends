// components/Footer.js

import React from "react";
import styled from "styled-components";
import Link from "next/link";

const FooterContainer = styled.footer`
  background: #f1f1f1;
  padding: 2rem;
  text-align: center;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;

  a {
    color: #333;
    text-decoration: none;
    font-size: 1.2rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterText = styled.p`
  font-size: 0.8rem;
  color: #666;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
        <Link href="/about" passHref>
          <a>About</a>
        </Link>
        <Link href="/contact" passHref>
          <a>Contact</a>
        </Link>
      </FooterLinks>
      <FooterText>&copy; 2024 SikFits. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
