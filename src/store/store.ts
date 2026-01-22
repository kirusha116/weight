import { configureStore } from '@reduxjs/toolkit'
import { balanceSlice } from './balanceSlice'
import { awardsSlice } from './awardsSlice'
import { tasksSlice } from './tasksSlice'
import { awardsDaySlice } from './awardsDaySlice'
import { tasksDaySlice } from './tasksDaySlice'

export const { updateBalance } = balanceSlice.actions
export const { updateAwardsDay } = awardsDaySlice.actions
export const { updateTasksDay } = tasksDaySlice.actions
export const { updateAwards } = awardsSlice.actions
export const { updateTasks } = tasksSlice.actions

export const store = configureStore({
  reducer: {
    balance: balanceSlice.reducer,
    awards: awardsSlice.reducer,
    tasks: tasksSlice.reducer,
    awardsDay: awardsDaySlice.reducer,
    tasksDay: tasksDaySlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
