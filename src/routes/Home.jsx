import React, { useRef } from 'react';
import Banner from '../components/Banner';
import Search from '../components/Search/Search';
import PropertyList from '../components/Properties/PropertyList';
import Highlight from '../components/Highlight/Highlight';

const Home = () => {
  const highlightRef = useRef(null);
  const headRef = useRef(null);

  const handleGetStartedClick = () => {
    console.log('Get Started button clicked');
    if (highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth' });
    } 
  };

  const scrollToHead = () => { 
        if (headRef.current) {
            headRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <>
      <Banner onGetStartedClick={handleGetStartedClick} />
      <Highlight ref={highlightRef} />
      <Search ref={headRef}/>
      <PropertyList scrollToHead={scrollToHead}/>
    </>
  );
};

export default Home;
