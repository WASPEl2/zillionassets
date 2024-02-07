import { Routes, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react'

import Header from './components/Header/Header';
import Home from './routes/Home';
import PropertyDetails from './routes/PropertyDetails';
import Footer from './components/Footer'
import HouseProvider from './context/HouseContext';
import AssetDetails from './components/PropertyDetails/PropertyDetails';
import InsertAssets from './routes/InsertAssets';
import UserDataProvider from './context/UserDataContext';

const App = () => {
  return (
    <HouseProvider>
      <UserDataProvider>
        <Container maxW='container.lg' px='6'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='property-details' element={ <PropertyDetails /> } >
              <Route path=":propertyId" element={<AssetDetails />} />
            </Route>
            <Route path='/insert-info' element={<InsertAssets />} />
            <Route path="*"
                  element={ <main style={{ padding: "1rem" }}>
                              <p>There's nothing here!</p>
                            </main>
                          }
            />
          </Routes>
        </Container>
        <Footer />
      </UserDataProvider>
    </HouseProvider>
  )
}

export default App