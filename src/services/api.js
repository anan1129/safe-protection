import { stringify } from 'qs';
import request from '../utils/request';
import {GATEWAY_ADDRESS} from '../utils/msa';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeMobileLogin(params) {
  return request('/api/login/mobile', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

// me

// 试题管理
export async function getKnowledgeChapter(){
  return request(GATEWAY_ADDRESS+'/api/knowledge-chapter');
}
export async function getKnowledgeNode(){
  return request(GATEWAY_ADDRESS+'/api/knowledge-node');
}
export async function getKnowledgeNodeFromChapter(params){
  return request(GATEWAY_ADDRESS+'/api/knowledge-node-chapter/'+params);
}

export async function getLevel(){
  return request(GATEWAY_ADDRESS+'/api/level');
}

export async function getOperationQuestions(params){
  return request(GATEWAY_ADDRESS+'/api/operation-questions?'+stringify(params));
}

export async function putOperationQuestions(params){
  return request(GATEWAY_ADDRESS+'/api/operation-questions',{
    method:'PUT',
    body:params,
  });
}
export async function postOperationQuestions(params){
  return request(GATEWAY_ADDRESS+'/api/operation-questions',{
    method:'POST',
    body:params,
  });
}
export async function delOperationQuestion(params){
  return request(GATEWAY_ADDRESS+'/api/operation-questions/'+params,{
    method:'DELETE',
  });
}

export async function getJudgeQuestions(params){
  return request(GATEWAY_ADDRESS+'/api/judge-questions?'+stringify(params));
}

export async function putJudgeQuestions(params){
  return request(GATEWAY_ADDRESS+'/api/judge-questions',{
    method:'PUT',
    body:params,
  });
}
export async function postJudgeQuestions(params){
  return request(GATEWAY_ADDRESS+'/api/judge-questions',{
    method:'POST',
    body:params,
  });
}
export async function delJudgeQuestion(params){
  return request(GATEWAY_ADDRESS+'/api/judge-questions/'+params,{
    method:'DELETE',
  });
}
export async function getRadioQuestions(params){
  return request(GATEWAY_ADDRESS+'/api/radio-questions?'+stringify(params));
}

export async function putRadioQuestions(params){
  return request(GATEWAY_ADDRESS+'/api/radio-questions',{
    method:'PUT',
    body:params,
  });
}
export async function postRadioQuestions(params){
  return request(GATEWAY_ADDRESS+'/api/radio-questions',{
    method:'POST',
    body:params,
  });
}
export async function delRadioQuestion(params){
  return request(GATEWAY_ADDRESS+'/api/radio-questions/'+params,{
    method:'DELETE',
  });
}

// 试卷管理
export async function getPaperRules(params){
  return request(GATEWAY_ADDRESS+'/api/paper-rules?'+stringify(params));
}
export async function postPaperRules(params){
  return request(GATEWAY_ADDRESS+'/api/paper-rules',{
    method:'POST',
    body:params
  })
}
