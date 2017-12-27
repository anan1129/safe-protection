import { getKnowledgeChapter,getLevel,getKnowledgeNode,getKnowledgeNodeFromChapter,getOperationQuestions,putOperationQuestions,postOperationQuestions,getJudgeQuestions,putJudgeQuestions,getRadioQuestions,putRadioQuestions,postJudgeQuestions,delOperationQuestion,delJudgeQuestion,postRadioQuestions,delRadioQuestion} from '../services/api';

export default {
  namespace: 'question',

  state: {
    level:[],
    knowledgeChapter:[],
    knowledgeNode:[],
    question:{},
    loading: true,
  },

  effects: {
    *getKnowledgeChapter({callback}, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getKnowledgeChapter);
      yield put({
        type: 'saveKnowledgeChapter',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if(callback) callback(response);
    },
    *getLevel({callback},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(getLevel);
      yield put({
        type:'saveLevel',
        payload:res
      });
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *getKnowledgeNode({callback},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(getKnowledgeNode);
      yield put({
        type:'saveKnowledgeNode',
        payload:res
      });
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *getKnowledgeNodeFromChapter({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(getKnowledgeNodeFromChapter,payload);
      yield put({
        type:'saveKnowledgeNodeFromChapter',
        payload:res
      });
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *getOperationQuestions({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(getOperationQuestions,payload);
      yield put({
        type:'saveQuestions',
        payload:res
      });
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *putOperationQuestions({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(putOperationQuestions,payload);
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *postOperationQuestions({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(postOperationQuestions,payload);
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *delOperationQuestion({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(delOperationQuestion,payload);
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *getJudgeQuestions({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(getJudgeQuestions,payload);
      yield put({
        type:'saveQuestions',
        payload:res
      });
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *putJudgeQuestions({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(putJudgeQuestions,payload);
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *postJudgeQuestions({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(postJudgeQuestions,payload);
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *delJudgeQuestion({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(delJudgeQuestion,payload);
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *getRadioQuestions({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(getRadioQuestions,payload);
      yield put({
        type:'saveQuestions',
        payload:res
      });
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *putRadioQuestions({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(putRadioQuestions,payload);
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *postRadioQuestions({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(postRadioQuestions,payload);
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
    *delRadioQuestion({callback,payload},{call,put}){
      yield put({
        type:'changeLoading',
        payload:true
      });
      const res=yield call(delRadioQuestion,payload);
      yield put({
        type:'saveQuestions',
        payload:res
      });
      yield put({
        type:'changeLoading',
        payload:false
      });
      if(callback) callback(res);
    },
  },

  reducers: {
    saveLevel(state, action) {
      return {
        ...state,
        level: action.payload,
      };
    },
    saveKnowledgeChapter(state, action) {
      return {
        ...state,
        knowledgeChapter: action.payload,
      };
    },
    saveKnowledgeNode(state, action) {
      return {
        ...state,
        knowledgeNode: action.payload,
      };
    },
    saveKnowledgeNodeFromChapter(state, action) {
      return {
        ...state,
        knowledgeNode: action.payload,
      };
    },
    saveQuestions(state, action) {
      return {
        ...state,
        questions: action.payload,
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
