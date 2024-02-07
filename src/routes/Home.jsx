import Banner from '../components/Banner'
import Search from '../components/Search/Search'
import PropertyList from '../components/Properties/PropertyList';
import Highlight from '../components/Highlight/Highlight';

const Home = () => {
  return (
    <>
      <Banner />
      {/* <Highlight/> */}
      <Search />
      <PropertyList />
    </>
  )
}

export default Home;