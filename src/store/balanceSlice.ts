import { setLast } from '@/utils/setLast'
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

export const getBalance = createAsyncThunk<number | null>(
  'storage/getBalance',
  async () => {
    const { getBalance } = await import('@/utils/getBalance')
    return await getBalance()
  },
)

export const balanceSlice = createSlice({
  name: 'balance',
  initialState: null as number | null,
  reducers: {
    updateBalance: (_, action: PayloadAction<number>) => {
      setLast(action.payload, 'balance')
      return action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(getBalance.fulfilled, (_, action) => {
      return action.payload
    })
  },
})
