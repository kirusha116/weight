import { awardsDayLength } from '@/constants/awardsDayLength'
import type { TasksOrAwards } from '@/types/TasksOrAwards'
import { makeDisplayFalse } from '@/utils/makeDisplayFalse'
import { setLastArr } from '@/utils/setLastArr'
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

export const getAwards = createAsyncThunk<TasksOrAwards[]>(
  'storage/getAwards',
  async () => {
    const { getSliceList } = await import('@/utils/getSliceList')
    return await getSliceList('awards', awardsDayLength)
  },
)

export const awardsSlice = createSlice({
  name: 'awards',
  initialState: null as TasksOrAwards[] | null,
  reducers: {
    updateAwards: (
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
    builder.addCase(getAwards.fulfilled, (_, action) => {
      return action.payload
    })
  },
})
