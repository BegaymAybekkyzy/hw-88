import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import {userReducer} from "../features/Users/userSlice.ts";
import {postsReducers} from "../features/Posts/postsSlice.ts";
import {commentsReducers} from "../features/Comments/commentsSlice.ts";

const userConfig = {
    key: "store: users",
    storage,
    whitelist: ["user"]
}

const rootReducer = combineReducers({
    users: persistReducer(userConfig, userReducer),
    posts: postsReducers,
    comments: commentsReducers,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware:( getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
            }
        })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;