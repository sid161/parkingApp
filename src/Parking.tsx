import React from "react";
import ParkingLot from "./ParkingLot";
import ParkingContext from "./ParkingContext";
import "./App.css";
import { Navigate } from "react-router-dom"
import Button from '@mui/material/Button';

class Parking extends React.Component {
  static contextType = ParkingContext;
  state = {
    input: "",
    carNo: "",
    redirect:false
  };


  render() {
    const { showParkingLot, setShowParkingLot, setParkingLot } = this.context;

    return (
      <div>
        <h1>Parking App</h1>
        <form
        data-testid="parking-create-submit-button"
          onSubmit={(e) => {
            e.preventDefault();
            setShowParkingLot(true);

            let noOfParkingSpacesArray = Array.from(
              { length: Number(this.state.input) },
              (_v, i) => i + 1
            );
            setParkingLot(
              noOfParkingSpacesArray.map((number) => {
                return {
                  empty: true,
                  parkingSlotNumber: number,
                };
              })
            );
            {this.setState({redirect:true})}
          }}
        >
          <label style={{fontSize:"20px"}}>Please enter no of spaces in parking lot</label>
          <input
          style={{padding:"15px",borderRadius:"20px", marginRight:"10px"}}
            onChange={(e) => {
              this.setState({
                input: e.target.value,
              });
            }}
            data-testid = "parking-create-text-input"
            type="number"
            value={this.state.input}
          />
          {/* <button type="submit">Submit</button> */}
          <Button  type="submit" variant="contained">Submit</Button>
        </form>
        {this.state.redirect && <Navigate to='/parking-lot' replace={true} />}
      </div>
      
    );
  }
}

export default Parking;