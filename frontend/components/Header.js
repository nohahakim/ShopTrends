import Link from "next/link";
import Nav from "./Nav";
import styled from "styled-components";
import Logo from "./styles/LogoStyles";

export default function Header() {
  return (
    <header>
      <Logo>
        <Link href="/">
          <a>TrendShop</a>
        </Link>
      </Logo>
      <Link href="/">
        <a>TrendShop</a>
      </Link>
      <div className="bar">
        <Link href="/">
          <a>TrendShop</a>
        </Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
      <Nav />
    </header>
  );
}
