import React from "react";
import {render,screen,fireEvent} from '@testing-library/react'
import ParkingDetails from "../ParkingDetails";
import { useNavigate } from "react-router-dom";
import ParkingContext from "../ParkingContext";


const mockUsedNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate : () => mockUsedNavigate
}))


// carNo:"", parkingSlotNumber:exitSlot, empty:true,time:null
const value = {
    parkingLot :[
        {
            empty: true,
            parkingSlotNumber : 1,
            carNo :"",
            time:null
        }
    ],
    setParkingLot: jest.fn(),
}

const props = {
    navigation : {
    navigate:jest.fn(),
    goBack : jest.fn()
    },
    route:{
    params:{
    parkingLot: value.parkingLot[0]
    }
    }
    }

test('Test without crash' , () => {
    const {getByTestId} = render(
        <ParkingContext.Provider value={value}>
            <ParkingDetails {...props}/>
        </ParkingContext.Provider>
    )
})


test("snapshot", () => {
    render(<ParkingDetails/>)
    let snap = screen
    expect(snap).toMatchSnapshot()
})

test("truthy", () => {
    render(<ParkingDetails/>)
    const truthy = screen
    expect(truthy).toBeDefined()
})

test("PaymentButton", async () => {
    render(<ParkingDetails/>)
    const payment = screen.getByTestId("deregister-payment-button")
    await fireEvent.click(payment)
    expect(payment).toBeDefined()
})

test("BackButton", () => {
    render(<ParkingDetails/>)
    const back = screen.getByTestId("deregister-back-button")
    fireEvent.click(back)
    expect(back).toBeDefined()
})