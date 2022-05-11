import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Parking from "./src/Parking";

import ParkingContext, { ParkingProvider } from "./src/ParkingContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParkingLot from "./src/ParkingLot";
import ParkingDetails from "./src/ParkingDetails";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ParkingProvider>
          <BrowserRouter>
          <Routes>
           
            <Route path="/parking-lot" element={<ParkingLot/>}/>
            <Route path="/parking-details" element={<ParkingDetails/>}/>
            <Route  path="/" element={<Parking/>}/>
         
          </Routes>
          </BrowserRouter>
        </ParkingProvider>
      </div>
    );
  }
}