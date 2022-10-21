import React, {createContext, useReducer} from "react";

type AppState = typeof initialState;
type Action = { type: "setParkingLot", payload: any } | {type: "setChekout", payload: any}

interface ParkingProviderProps {
    children: React.ReactNode;
}

interface list {
    id: number;
    slot: boolean;
    carReg: string;
    time: any;
}

interface checkout {
    id: number;
    slot: boolean;
    carReg: string;
    time: any;
}

const initialState = {
    list: [
        {id: '1', slot: false, carReg: '', time: ''} 
    ],
    checkout: { id: '1', slot: false, carReg: '', time: '' },
}

const ParkingContext = createContext<{
    state: AppState, 
    dispatch: React.Dispatch<Action>
}>({state: initialState, dispatch: () => {}});

const reducer = (state: AppState, action: Action) => {
    switch(action.type) {
        case "setParkingLot":
            return {
                ...state,
                list: action.payload,
            };
        case "setChekout":
            return {
                ...state,
                checkout: action.payload,
            };
        default:
            return state;
    }
}

const ParkingProvider = ({children}: ParkingProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <ParkingContext.Provider value={{state, dispatch}}>
            {children}
        </ParkingContext.Provider>
    )
}

export {ParkingContext, ParkingProvider}