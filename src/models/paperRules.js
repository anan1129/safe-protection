import { getPaperRules,postPaperRules} from '../services/api';

export default {
  namespace: 'paperRules',

  state: {
    data:{},
    loading:true,
  },

  effects: {
    *getPaperRules({payload,callback}, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const res = yield call(getPaperRules,payload);
      yield put({
        type: 'save',
        payload: res,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if(callback) callback(res);
    },
    *postPaperRules({payload,callback}, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const res = yield call(postPaperRules,payload);
      console.log(res);
      yield put({
        type: 'save',
        payload: res,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if(callback) callback(res);
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
