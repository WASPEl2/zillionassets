import React, { useRef } from 'react';
import Banner from '../components/Banner';
import Search from '../components/Search/Search';
import PropertyList from '../components/Properties/PropertyList';
import Highlight from '../components/Highlight/Highlight';

const Home = () => {
  const highlightRef = useRef(null);

  const handleGetStartedClick = () => {
    console.log('Get Started button clicked');
    if (highlightRef.current) {
      console.log('Highlight ref exists, scrolling...');
      highlightRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Highlight ref is not yet available');
    }
  };

  return (
    <>
      <Banner onGetStartedClick={handleGetStartedClick} />
      <Highlight ref={highlightRef} />
      <Search />
      <PropertyList />
    </>
  );
};

export default Home;
