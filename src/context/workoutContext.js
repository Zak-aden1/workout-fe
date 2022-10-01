import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(w => w._id !== action.payload._id)
      }
    case 'UPDATE_WORKOUT':
      const newState = state.workouts.map(ww => {
        if(ww._id === action.payload.id) {
          return {...ww, ...action.payload}
        } else {
          return ww
        }
      })
      return {
        workouts: newState
      }

    default:
      return state
  }
}

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })

  return (
    <WorkoutContext.Provider value={{...state, dispatch}}>
      {children}
    </WorkoutContext.Provider>
  )
}