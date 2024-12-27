import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../Features/newsSlice";
import usersReducer from "../Features/userSlice";
import donationReducer from "../Features/donationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { combineReducers } from "redux";
import { reset as resetUsers } from "../Features/userSlice";
import { reset as resetNews } from "../Features/newsSlice";
import { reset as resetDonation } from "../Features/donationSlice";

const persistConfig = {
  key: "reduxstore",
  storage,
};

const resetStore = () => {
  store.dispatch(resetUsers()); // Reset users state
  store.dispatch(resetNews()); // Reset posts state
  store.dispatch(resetDonation()); // Reset manage users state
};

const rootReducer = combineReducers({
  users: usersReducer,
  news: newsReducer,
  donations: donationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistore = persistStore(store);

export { store, persistore, resetStore };
