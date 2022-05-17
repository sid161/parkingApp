import React from "react";
import {render,screen,fireEvent} from '@testing-library/react'
import Parking from "../Parking";
import ParkingContext from "../ParkingContext";

const mockUsedNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate : () => mockUsedNavigate
}))

const value = {
    parkingLot :[
        {
            empty: true,
            parkingSlotNumber : 1
        }
    ],
    setParkingLot: jest.fn(),
}

const props = {
    navigation : {
        navigate:jest.fn()

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
            <Parking {...props}/>
        </ParkingContext.Provider>
    )
})

    test("snapshot", () => {
        render(<Parking/>)
        let snap = screen
        expect(snap).toMatchSnapshot()
    })
    
    
    test("check for space input", () => {
        render(<Parking/>)
        const input = screen.getByTestId("parking-create-text-input").querySelector('input')
        expect(input).toBeDefined()
    })

    test("changein input", () => {
        render(<Parking/>)
        const space:any = screen.getByTestId("parking-create-text-input")
        fireEvent.change(space, {
            target: {
                value:"5"
            }
        }

        )
        expect(space.value).toBe("5")
        const submit = fireEvent.click(screen.getByTestId("parking-create-submit-button"))
        expect(submit).toBeDefined()

    })
    
    // test("click for space submit", () => {
    //     render(<Parking/>)
    //     const spaceSubmit = screen.getByTestId("parking-create-submit-button")
    //     fireEvent.click(spaceSubmit)
    //     expect(spaceSubmit).toBeDefined()
    // })


