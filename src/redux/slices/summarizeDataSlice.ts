import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Summary {
  _id: string;
  fileName: string;
  summary: string;
  createdAt: string;
  status?: string;
}

interface SummariesState {
  summaries: Summary[];
}

const initialState: SummariesState = {
  summaries: [],
};

const summarizeDataSlice = createSlice({
  name: "summaries",
  initialState,
  reducers: {
    setSummariesData: (state, action: PayloadAction<Summary[]>) => {
      state.summaries = action.payload;
    },
  },
});

export const { setSummariesData } = summarizeDataSlice.actions;
export default summarizeDataSlice.reducer;
