import React from 'react'
import BannerHome from '../components/BannerHome';
import CategoriesHome from '../components/CategoriesHome';
import ComingSoonWatchesPage from '../components/ComingSoonWatchesPage';
import FashionPage from '../components/FashionPage';
import TestimonialPage from '../components/TestimonialPage';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <BannerHome />
      <CategoriesHome/>
      <ComingSoonWatchesPage/>
      <FashionPage/>
      <TestimonialPage/>
      <Footer/>

    </div>
  )
}

export default Home
