import React from "react";
import ParkingContext from "./ParkingContext";
import {Navigate} from 'react-router-dom'
import Button from '@mui/material/Button';



class ParkingDetails extends React.Component{
    state = {
        deallocatedDisable:true,
        backDisable:true,
        redirect:false

    }
    static contextType = ParkingContext

    // payment response method
    succesfulPayment =() => {
        this.setState({
            deallocatedDisable:false
        })
        alert("Payment Taken Succesfully")
    }

    // function to handlePayment 
    handlePayment = (carNo:any,charges:number) => {
        fetch(`https://httpstat.us/200`, {
            method :"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carRegistration: carNo,Charges:charges })
        })
        .then(res => res.status === 200 ? this.succesfulPayment()  : alert("Payment Failure") )

    }

    // function to deallocate space 
    deallocateSpace = () => {
        let {exitSlot,parkingLot,setParkingLot} = this.context
       let index =  parkingLot?.findIndex((parkingSlot:any) => parkingSlot.parkingSlotNumber === exitSlot)
       parkingLot[index] = {carNo:"", parkingSlotNumber:exitSlot, empty:true,time:null }
       setParkingLot(parkingLot)
       this.setState({
           backDisable:false
       })
       
    }

    // function to navigate back
    navigateBack = () => {
        this.setState({
            redirect:true
        })

    }
    
    render(){
        const {parkingLot,exitSlot} = this.context
        
       
        let exitSlotDetail = parkingLot?.find((parkingSlot:any) => {
           return parkingSlot?.parkingSlotNumber === exitSlot})

           // time calculation for entry of car
           
           let entryHours = exitSlotDetail?.time?exitSlotDetail.time.getHours() : 0 
           let entryMinutes = exitSlotDetail?.time?exitSlotDetail.time.getMinutes() : 0

           // current time calculation
     
           let currentHours = new Date().getHours() + 3
           let currentMinutes = new Date().getMinutes() 

            let totalEntryMinutes = entryHours * 60 + entryMinutes
            let totalCurrentMinutes = currentHours * 60 + currentMinutes

            let totalDuration = totalCurrentMinutes - totalEntryMinutes
            let totalHours = Math.floor(totalDuration / 60)
            let totalMinutes = totalDuration % 60

            // to calculate charges

            let totalCharge = totalHours<= 2 ? 10 : totalMinutes>0 ? (totalHours ) * 10 : (totalHours - 1) * 10

            

     



        return (
            <>
            <h2>Parking Details</h2>
            <p> Car Number - {exitSlotDetail?.carNo}</p>
            <p> Entry Time -{entryHours + ":" + entryMinutes}</p>
            <p>Parking Slot Number - {exitSlotDetail?.parkingSlotNumber}</p>
            <p> Current Time- {currentHours + ":" + currentMinutes}</p>
            <p>Total Duration: {totalHours + ":" + totalMinutes}</p>
            <p>Total Charges: {"$" + totalCharge}</p>

            <div>
            {/* <button onClick = {() => this.handlePayment(exitSlotDetail.carNo,totalCharge)}>Payment</button> */}
            <Button data-testid = "deregister-payment-button" onClick = {() => this.handlePayment(exitSlotDetail?.carNo,totalCharge)} >Payment </Button>
            <Button onClick={() =>this.deallocateSpace()} disabled = {this.state.deallocatedDisable} >DeAllocate Space</Button>
                {/* <button onClick={() =>this.deallocateSpace()} disabled = {this.state.deallocatedDisable}>Deallocate Space</button> */}
                <button data-testid="deregister-back-button" onClick ={() => this.navigateBack()} disabled = {this.state.backDisable} >Back</button>
                {this.state.redirect && <Navigate to='/parking-lot' replace={true} />}
                
            </div>
            </>
                

        )
    }
}

export default ParkingDetails