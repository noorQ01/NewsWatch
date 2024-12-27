import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  donation: {
    items: [],
    totalDonation: 0,
    _id: null,
    userId: null,
    createdAt: null,
    updatedAt: null,
  },
  status: "idle",
  iserror: null,
};
export const addDonate = createAsyncThunk(
  "donation/addDonate",
  async (donationData) => {
    try {
      console.log(donationData);
      const response = await axios.post(`${ENV.SERVER_URL}/addDonate`, {
        userId: donationData.userId,
        newsId: donationData.newsId,
        amount: donationData.amount,
        paymentMethod: donationData.paymentMethod,
      });
      console.log(response);
      const donation = response.data.donation;
      return donation;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getDonation = createAsyncThunk(
  "donation/getDonation",
  async (userId) => {
    try {
      const response = await axios.get(
        `${ENV.SERVER_URL}/getDonation/${userId}`
      );
      console.log(response.data);

      return response.data.donation;
    } catch (error) {
      console.log(error);
    }
  }
);

export const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDonate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDonate.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.donation = action.payload;
      })
      .addCase(addDonate.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      })
      .addCase(getDonation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDonation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.donation = action.payload;
      })
      .addCase(getDonation.rejected, (state, action) => {
        state.status = "failed";
        state.iserror = action.error.message;
      });
  },
});

export const { reset } = donationSlice.actions;
export default donationSlice.reducer;
