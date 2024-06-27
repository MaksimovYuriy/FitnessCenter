import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

export interface UserState {
  Id : number
  Name : string | null
  Surname : string | null
  Age : number | null
  Email : string
  Phone : string
  GenderID : number | null
  LoyaltyID : number | null
  Scores : number | null
  SubID : number | null
  ClubID : number | null
}

const initialState: UserState = {
    Id : 0,
    Name : "",
    Surname : "",
    Age : 0,
    Email : "",
    Phone : "",
    GenderID : 0,
    LoyaltyID : 0,
    Scores : 0,
    SubID : 0,
    ClubID : 0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const jwt_data : UserState = jwtDecode(action.payload)
      state.Id = jwt_data.Id
      state.Name = jwt_data.Name
      state.Surname = jwt_data.Surname
      state.Age = jwt_data.Age
      state.Email = jwt_data.Email
      state.Phone = jwt_data.Phone
      state.GenderID = jwt_data.GenderID
      state.LoyaltyID = jwt_data.LoyaltyID
      state.Scores = jwt_data.Scores
      state.SubID = jwt_data.SubID
      state.ClubID = jwt_data.ClubID
    },

    logout: (state) => {
      state = initialState
      localStorage.clear()
    }
  }
})

export const { login, logout } = userSlice.actions