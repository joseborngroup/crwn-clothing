import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';

export default function* rootSaga() {
  // Here we are going to pass each individual saga
  yield all([
    call(fetchCollectionsStart)
  ]);
}