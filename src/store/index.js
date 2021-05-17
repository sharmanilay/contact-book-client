import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user']
}

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
const persistedReducer = persistReducer(persistConfig, mainReducer)

export const store = createStore(persistedReducer, composedEnhancer)
export const persistedStore = persistStore(store)
