import { awardsDayLength } from '@/constants/awardsDayLength'
import type { TasksOrAwards } from '@/types/TasksOrAwards'
import { makeDisplayFalse } from '@/utils/makeDisplayFalse'
import { setLastArr } from '@/utils/setLastArr'
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

export const getAwardsDay = createAsyncThunk<TasksOrAwards[]>(
  'storage/getAwardsDay',
  async () => {
    const { getSliceListDay } = await import('@/utils/getSliceListDay')
    return await getSliceListDay('awards', awardsDayLength)
  },
)

export const awardsDaySlice = createSlice({
  name: 'awardsDay',
  initialState: null as TasksOrAwards[] | null,
  reducers: {
    updateAwardsDay: (
      state: TasksOrAwards[] | null,
      action: PayloadAction<{ id: number; daily: boolean }>,
    ) => {
      if (state === null) return null
      const { id, daily } = action.payload
      setLastArr(id, 'completedAwards')
      if (!daily) makeDisplayFalse('awards', id)
      return state.filter(el => el.id !== id) as TasksOrAwards[]
    },
  },
  extraReducers(builder) {
    builder.addCase(getAwardsDay.fulfilled, (_, action) => {
      return action.payload
    })
  },
})
