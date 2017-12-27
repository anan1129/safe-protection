import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {
  Card,
  Form,
  Tabs,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import QuestionFilter from '../../../components/custom/QuestionFilter';
import JudgeQuestionsTable from '../../../components/custom/JudgeQuestionsTable';

import styles from './style.less';

@connect(state => ({
  question: state.question,
}))
@Form.create()
export default class JudgeQuestion extends PureComponent {
  state = {}


  handleTabChange = (key) => {
    const { dispatch } = this.props;
    switch (key) {
      case 'operation':
        dispatch(routerRedux.push('/question/OperationQuestion'));
        break;
      case 'radio':
        dispatch(routerRedux.push('/question/RadioQuestion'));
        break;
      case 'judge':
        dispatch(routerRedux.push('/question/JudgeQuestion'));
        break;
      default:
        break;
    }
  }


  render() {
    const tabList = [
      {
        key: 'operation',
        tab: '操作题',
      },
      {
        key: 'radio',
        tab: '单选题',
      },
      {
        key: 'judge',
        tab: '判断题',
        default:true,
      },
    ];

    return (
      <PageHeaderLayout title="试题管理" content='' tabList={tabList} onTabChange={this.handleTabChange}>
        <div className={styles.coverCardList}>
          <Card bordered={false} title="判断题">
            <JudgeQuestionsTable></JudgeQuestionsTable>
          </Card>
        </div>
      </PageHeaderLayout>

    );
  }
}
