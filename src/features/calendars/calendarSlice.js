import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {createEvent,fetchEvents} from "@/features/calendars/calendarAPI.js";
const initialState = {
  calendar: [],
  events: [],
  status: 'idle',
  error: null,
  count: 0
}
export const fetchEventsAsync = createAsyncThunk('calendar/fetchEvents', async (events_params) => {
  return await fetchEvents(events_params)
})
export const createEventAsync = createAsyncThunk('calendar/createEvent', async (event_params) => {
  console.log(event_params)
  return await createEvent(event_params)
})

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(createEventAsync.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(createEventAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.event = action.payload.event
    })
    .addCase(createEventAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })



  }

})


export default calendarSlice.reducer;

