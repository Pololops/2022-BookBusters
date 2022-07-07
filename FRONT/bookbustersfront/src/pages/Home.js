import * as React from "react";

import "../styles/Home.scss";

import Header from "../components/Header/Header";
import SignButtons from "../components/SignButtons/SignButtons";
import BookLists from '../components/BookLists';
import WelcomeBox from "../components/WelcomeBox/WelcomeBox";
import Buttons from "../components/Button/Button";

const Home = () => {
  return (
    <>
      <Header />
      <WelcomeBox />
      <Buttons />
      <BookLists type='home' />
      <SignButtons />
    </>
  );
};

export default Home;
