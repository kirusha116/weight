import { tasksDayLength } from '@/constants/tasksDayLength'
import type { TasksOrAwards } from '@/types/TasksOrAwards'
import { makeDisplayFalse } from '@/utils/makeDisplayFalse'
import { setLastArr } from '@/utils/setLastArr'
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

export const getTasks = createAsyncThunk<TasksOrAwards[]>(
  'storage/getTasks',
  async () => {
    const { getSliceList } = await import('@/utils/getSliceList')
    return await getSliceList('tasks', tasksDayLength)
  },
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: null as TasksOrAwards[] | null,
  reducers: {
    updateTasks: (
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
    builder.addCase(getTasks.fulfilled, (_, action) => {
      return action.payload
    })
  },
})
