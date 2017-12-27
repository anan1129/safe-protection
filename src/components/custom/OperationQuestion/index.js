/**
 * Created by zhengan on 2017/12/11.
 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Card,
  Form,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import QuestionFilter from '../QuestionFilter';
import OperationQuestionsTable from '../OperationQuestionsTable';

import styles from './index.less';

@connect(state => ({
  question: state.question,
}))
@Form.create()
export default class OperationQuestion extends PureComponent {
  state = {
    level: [],
    currentLevel: '',
    knowledgeChapter: [],
    knowledgeNode: [],
    currentChapter: '',
    currentNode: '',
  }

  componentDidMount() {
    this.getLevel();
    this.getKnowledgeChapter();
    this.getKnowledgeNode();
    console.log(this.props.question);
  }

  getLevel() {
    const {dispatch}=this.props;
    dispatch({
      type: 'question/getLevel',
      callback: (res)=> {
        this.setState({
          level: res,
          currentLevel: res[0],
        });
      },
    });
  }

  getKnowledgeChapter() {
    const {dispatch}=this.props;
    dispatch({
      type: 'question/getKnowledgeChapter',
      callback: (res)=> {
        this.setState({
          knowledgeChapter: res
        });
      },
    });
  }

  getKnowledgeNode() {
    const {dispatch}=this.props;
    dispatch({
      type: 'question/getKnowledgeNode',
      callback: (res)=> {
        console.log(res);
        this.setState({
          knowledgeNode: res
        })
      }
    });
  }

  render() {

    return (

        <div className={styles.coverCardList}>
          <Card bordered={false} title="筛选">
            <QuestionFilter onChange={this.changeKnowledgeNode}></QuestionFilter>
          </Card>
          <br/>
          <Card bordered={false} title="操作题">
            <OperationQuestionsTable></OperationQuestionsTable>
          </Card>
        </div>

    );
  }
}
