import React from 'react'
import { Outlet } from 'react-router'
import Header from "./Header"
import Footer from './Footer';

export default function Home() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}
