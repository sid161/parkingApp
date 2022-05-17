import React from "react";
import {render,screen,fireEvent} from '@testing-library/react'
import ParkingLot from "../ParkingLot";
import ParkingContext from "../ParkingContext";


global.alert = jest.fn();

const mockUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate : () => mockUsedNavigate
}))

const value = {
    parkingLot :[
        {
            empty: true,
            parkingSlotNumber : 1,
            carNo :"",
            time:null
        },
        {
            empty: false,
            parkingSlotNumber : 1,
            carNo :"3456",
            time:new Date()
        }

    ],
    setParkingLot: jest.fn(),
}

const props = {
    navigation : {
    navigate:jest.fn(),
  
    },
    route:{
    params:{
    parkingLot: value.parkingLot[0]
    }
    }
    }
    test('Test without crash' , () => {
        const app = render(
            <ParkingContext.Provider value={value}>
                <ParkingLot {...props}/>
            </ParkingContext.Provider>
        )
        expect(app).toBeTruthy()
    })

test("snapshot", () => {
    render(<ParkingLot/>)
    const snap = screen
    expect(snap).toMatchSnapshot()
})


test("truthy", () => {
    render(<ParkingLot/>)
    const truthy = screen
    expect(truthy).toBeDefined()
})


test("car registration input", () => {
    render(<ParkingLot/>)
    const carRegister = screen.getByTestId("parking-drawing-registration-input")
    expect(carRegister).toBeDefined()
})

test("car registration", () => {
    render(<ParkingLot/>)
    const carInput:any = screen.getByTestId('parking-drawing-registration-input')
    fireEvent.change(carInput,{
        target:{
            value:"2345",
        },
    });
    expect(carInput.value).toBe("2345")
})

test("carRegistrationSubmit", () => {
    render(<ParkingLot/>)
    const submit = screen.getByTestId('parking-drawing-add-car-button')
    fireEvent.click(submit)
    expect(submit).toBeDefined()
})

test("navigate", () => {
    render(<ParkingLot/>)
    const navigate = screen.getByTestId('navigate-btn')
    fireEvent.click(navigate)
    expect(navigate).toBeDefined()
})
test("for random number",() => {
    render(<ParkingLot/>)
   let parkingLot  = new ParkingLot(value)
   expect(parkingLot.getRandomIntInclusive(2,7)).toBeGreaterThanOrEqual(2)

})



