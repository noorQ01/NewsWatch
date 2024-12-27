import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  news: [],
  comments: [],
  likes: [],
};

export const addNews = createAsyncThunk("news/addNews", async (newsData) => {
  try {
    const response = await axios.post("http://localhost:3001/addNews", {
      title: newsData.title,
      imageURL: newsData.imageURL,
      details: newsData.details,
      category: newsData.category,
      type: newsData.type,
    });

    const news = response.data.news;
    return news;
  } catch (error) {
    console.log(error);
  }
});

export const viewNews = createAsyncThunk("news/viewNews", async () => {
  try {
    const response = await axios.get("http://localhost:3001/viewNews");
    return response.data.news;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

export const updateNews = createAsyncThunk(
  "news/updateNews",
  async ({ newsData, news_id }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/updateNews/${news_id}`,
        {
          title: newsData.title,
          imageURL: newsData.imageURL,
          details: newsData.details,
          category: newsData.category,
          type: newsData.type,
        }
      );
      console.log(response);
      const news = response.data.news;
      return news;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteNews = createAsyncThunk("news/deleteNews", async (id) => {
  try {
    console.log(id);
    const response = await axios.delete(
      `http://localhost:3001/deleteNews/${id}`
    );
    return id;
  } catch (error) {
    console.log(error);
  }
});

export const likeNews = createAsyncThunk("news/likeNews", async (newsData) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/likeNews/${newsData.newsId}`,
      {
        userId: newsData.userId,
      }
    );
    const news = response.data.news;
    return news;
  } catch (error) {
    console.log(error);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNews.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.news.unshift(action.payload);
      })
      .addCase(addNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(viewNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.news = action.payload;
      })
      .addCase(viewNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.isLoading = false;
      })
      .addCase(updateNews.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.news = state.news.filter((news) => news._id !== action.payload);
      })
      .addCase(deleteNews.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(likeNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedNewsIndex = state.news.findIndex(
          (news) => news._id === action.payload._id
        );
        if (updatedNewsIndex !== -1) {
          state.news[updatedNewsIndex].likes = action.payload.likes;
        }
      })
      .addCase(likeNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { reset } = newsSlice.actions;
export default newsSlice.reducer;
