import React from "react";
import ParkingContext from "./ParkingContext";
import Button from '@mui/material/Button';


import { Navigate } from "react-router-dom"
class ParkingLot extends React.Component {
  static contextType = ParkingContext;

  state = {
    carNo: "",
    redirect:false
  }

  
  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };

  // method for toast message when parking is full
  toastMessage = () => {
    alert("Parking lot is full")
  }

  handleCarRegistration = (e) => {
    const { setCarNo, parkingLot, setParkingLot } = this.context;
    e.preventDefault();
    setCarNo(this.state.carNo);
    let freeParkingLot = parkingLot.filter(
      (parkingSlot: any) => parkingSlot.empty === true
    );
    if(freeParkingLot.length === 0){
      return this.toastMessage()
    } 
    let parkingSlot = this.getRandomIntInclusive(0, freeParkingLot.length - 1);
    //selected parking slot number
    let selectedParkingSlotNumber  = freeParkingLot[parkingSlot].parkingSlotNumber
    // console.log(selectedParkingSlotNumber);

    // to find index of selected slot number in parkinglot[]
      let requiredIndex = parkingLot.findIndex((parkingSlot:any,i)=> parkingSlot.parkingSlotNumber === selectedParkingSlotNumber)
      console.log(requiredIndex);
    parkingLot[requiredIndex] = {
      empty: false,
      parkingSlotNumber: parkingLot[requiredIndex].parkingSlotNumber,
      carNo: this.state.carNo,
      time: new Date(),
    };
    console.log(parkingLot[requiredIndex].parkingSlotNumber);
    setParkingLot(parkingLot);
    };

    // function to navigate to detail page  
    handleNavigate = (parkingSlot:any) => {
      const { setExitSlot} = this.context;
      if(!parkingSlot.empty){
        this.setState({redirect:true})   
        setExitSlot(parkingSlot.parkingSlotNumber)
      }
    }
  render() {
    const { parkingLot } = this.context;

    return (
      <>
      <div
        style={{
          display: "inline-flex",
          border: "1px solid grey",
          flexWrap: "wrap",
        }}
      >
        {parkingLot.map((parkingSlot: any) => {
          return (
            <div
              key={parkingSlot.parkingSlotNumber}
              className={parkingSlot.empty ? "green" : "red"}
              style={{
                padding: "1rem",
                color: "white",
                margin: "1rem",
              }}
              // onclick function to navigate and move to detail page
              onClick = {() =>this.handleNavigate(parkingSlot)}
            >
              <div style={{display:"flex",flexDirection:"column"}}>
              <div>Parking Slot Number : {parkingSlot.parkingSlotNumber}</div>
              <div>Car No: {parkingSlot.carNo} </div>

              <div>Time: {parkingSlot.time && parkingSlot.time.getHours() + ':' + parkingSlot.time.getMinutes()}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
          <form onSubmit={this.handleCarRegistration}>
            <label style={{fontSize:"20px"}}> Please Enter Car registration number</label>
            <input
            style={{padding:"15px",borderRadius:"20px", marginRight:"10px"}}
              onChange={(e) => {
                this.setState({
                  carNo: e.target.value,
                });
              }}
              placeholder="Enter car registration number"
              value={this.state.carNo}
            />
             <Button type="submit" variant="contained">Submit</Button>
          </form>
        {this.state.redirect && <Navigate to='/parking-details' replace={true} />}

        </div>
      
      </>
    );
  }
}

export default ParkingLot;

function setExitSlot(parkingSlotNumber: any) {
  throw new Error("Function not implemented.");
}
