import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface NoticeState {
  message: string | null;
}

const initialState: NoticeState = {
  message: null,
};

let noticeTimeoutId: number | null = null;

export const showNotice = createAsyncThunk(
  "notice/showNotice",
  async (message: string, { dispatch }) => {
    if (noticeTimeoutId) {
      window.clearTimeout(noticeTimeoutId);
    }
    dispatch(setNotice(message));
    noticeTimeoutId = window.setTimeout(() => {
      dispatch(clearNotice());
      noticeTimeoutId = null;
    }, 2600);
  }
);

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNotice: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearNotice: (state) => {
      state.message = null;
    },
  },
});

export const { setNotice, clearNotice } = noticeSlice.actions;
export default noticeSlice.reducer;
