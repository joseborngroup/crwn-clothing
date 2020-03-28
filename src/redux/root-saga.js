import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  // Here we are going to pass each individual saga
  yield all([
    call(fetchCollectionsStart),
    call(userSagas)
  ]);
}