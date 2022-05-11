import React from "react";
import {render,screen,fireEvent} from '@testing-library/react'
import Parking from "../Parking";

const mockUsedNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate : () => mockUsedNavigate
}))

test("check for space input", () => {
    render(<Parking/>)
    const input = screen.getByTestId("parking-create-text-input")
    expect(input).toBeDefined()
})

test("click for space submit", () => {
    render(<Parking/>)
    const spaceSubmit = screen.getByTestId("parking-create-submit-button")
    fireEvent.click(spaceSubmit)
    expect(spaceSubmit).toBeDefined()
})

