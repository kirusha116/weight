import { tasksDayLength } from '@/constants/tasksDayLength'
import type { TasksOrAwards } from '@/types/TasksOrAwards'
import { makeDisplayFalse } from '@/utils/makeDisplayFalse'
import { setLastArr } from '@/utils/setLastArr'
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

export const getTasksDay = createAsyncThunk<TasksOrAwards[]>(
  'storage/getTasksDay',
  async () => {
    const { getSliceListDay } = await import('@/utils/getSliceListDay')
    return await getSliceListDay('tasks', tasksDayLength)
  },
)

export const tasksDaySlice = createSlice({
  name: 'tasksDay',
  initialState: null as TasksOrAwards[] | null,
  reducers: {
    updateTasksDay: (
      state: TasksOrAwards[] | null,
      action: PayloadAction<{ id: number; daily: boolean }>,
    ) => {
      if (state === null) return null
      const { id, daily } = action.payload
      setLastArr(id, 'completedTasks')
      if (!daily) makeDisplayFalse('tasks', id)
      return state.filter(el => el.id !== id) as TasksOrAwards[]
    },
  },
  extraReducers(builder) {
    builder.addCase(getTasksDay.fulfilled, (_, action) => {
      return action.payload
    })
  },
})
