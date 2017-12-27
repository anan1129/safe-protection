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
import PaperRulesTable from '../../../components/custom/PaperRulesTable';


import styles from './style.less';

@connect(state => ({
  question: state.question,
  paperRules: state.paperRules,

}))
@Form.create()
export default class PaperRules extends PureComponent {
  state = {
    questions:[],
    pagination:  {
      pageSize:5,
      page:0,
    },
  }


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
        default:true,
      },
      {
        key: 'radio',
        tab: '单选题',
      },
      {
        key: 'judge',
        tab: '判断题',
      },
    ];

    return (
      <PageHeaderLayout title="试卷管理" content='' >
        <div className={styles.coverCardList}>
          <Card bordered={false} title="出题规则">
            <PaperRulesTable  sourceData={this.state.questions}  ></PaperRulesTable>
          </Card>
        </div>
      </PageHeaderLayout>

    );
  }
}
