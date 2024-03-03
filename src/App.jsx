import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react'

import Header from './components/Header/Header';
import Home from './routes/Home';
import PropertyDetails from './routes/PropertyDetails';
import Footer from './components/Footer'
import HouseProvider from './context/HouseContext';
import AssetDetails from './components/PropertyDetails/PropertyDetails';
import InsertAssets from './routes/InsertAssets';
import EditAsset from './routes/EditAsset'
import UserDataProvider from './context/UserDataContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <UserDataProvider>
      <HouseProvider>
        <Container maxW='container.lg' minH='100vh' px='6'>
          <Header isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen}/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='property-details' element={<PropertyDetails />}>
              <Route path=":propertyId" element={<AssetDetails />} />
            </Route>
            <Route path='insert-info' element={
              <ProtectedRoute>
                <InsertAssets setIsLoginModalOpen={setIsLoginModalOpen}/>
              </ProtectedRoute>
            }/>
            <Route path='insert-info/:propertyId' element={
              <ProtectedRoute>
                <EditAsset setIsLoginModalOpen={setIsLoginModalOpen}/>
              </ProtectedRoute>
            }/>
            <Route path="*"
                  element={<main style={{ padding: "1rem" }}>
                              <p>There's nothing here!</p>
                            </main>
                          }
            />
          </Routes>
        </Container>
        <Footer />
      </HouseProvider>
    </UserDataProvider>
  )
}

export default App;