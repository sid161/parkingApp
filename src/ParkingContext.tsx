import React, { createContext } from "react";

const ParkingContext = createContext("");

export class ParkingProvider extends React.Component {
  state = {
    showParkingLot: false,
    carNo: "",
    parkingLot: [],
    exitSlot:null
  };

  setExitSlot = (exitSlot:number) => {
    this.setState({exitSlot})
  }

  setParkingLot = (parkingLot: []) => {
    this.setState({ parkingLot });
  };

  setCarNo = (carNo: number) => {
    this.setState({ carNo });
  };

  setShowParkingLot = (showParkingLot: any) => {
    this.setState({ showParkingLot });
  };
  render() {
    const { showParkingLot, carNo, parkingLot,exitSlot } = this.state;
    const { setShowParkingLot, setCarNo, setParkingLot,setExitSlot } = this;
    return (
      <ParkingContext.Provider
        value={{
          showParkingLot,

          setShowParkingLot,
          carNo,
          setCarNo,
          parkingLot,
          setParkingLot,
          exitSlot,
          setExitSlot
        }}
      >
        {this.props.children}
      </ParkingContext.Provider>
    );
  }
}

export default ParkingContext;