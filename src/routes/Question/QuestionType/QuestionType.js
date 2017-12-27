/**
 * Created by zhengan on 2017/11/29.
 */
import React, {PureComponent} from 'react';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {Table, Divider, Icon,} from 'antd';
import { Link } from 'react-router-dom';
import {connect} from 'dva';
import styles from './style.less';
const {Column, ColumnGroup} = Table;

const data = [{
  key: '1',
  firstName: 'John',
  lastName: 'Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  firstName: 'Jim',
  lastName: 'Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  firstName: 'Joe',
  lastName: 'Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const rowSelection={
  onchange:(rowKeys,rows)=>{
    console.log(`rowkeys: ${rowKeys}   ;   rows${rows}`)
  },
  getCheckboxProps:record=>({
    disabled:record.lastName==='Brown'
  })
}

@connect(state=>({
  question:state.question
}))
export default class QuestionType extends PureComponent {

  componentDidMount(){
    const {dispatch}=this.props;
    dispatch({
      type:'question/getKnowledge'
    });
    console.log(this.props.question);
  }
  render() {
    const columns = [
      {
        title: '题库名称',
        dataIndex: 'tkname',
      },
      {
        title: '开始类型',
        dataIndex: 'kslx',
      },
      {
        title: '属于等级',
        dataIndex: 'sydj',
      },
      {
        title: '试题类型',
        dataIndex: 'stlx',
      },
      {
        title: '总条数',
        dataIndex: 'allnum',
      },

      {
        title: '分数',
        dataIndex: 'fenshu',
      },
      {
        title: '出题条数',
        dataIndex: 'outnum',
      },
      {
        title: '操作',
        render: (val) => (
          <div>
            <a onClick={()=>this.handleAdd(true)}>查看</a>
            <Divider type="vertical"/>
            <a >编辑</a>
            <Divider type="vertical"/>
            <a >试题列表</a>
          </div>
        ),
      },
    ];
    return (
      <PageHeaderLayout title="QuestionType" content="QuestionType">
        <Link to={{
          pathname:'/list/table-list/4',
          search:'',
          state:{pageSize:3}
        }}>table list</Link>
        <Table dataSource={data} rowSelection={rowSelection}>
          <Column
            title="First Name"
            dataIndex="firstName"
            key="firstName"
          />
          <Column
            title="Last Name"
            dataIndex="lastName"
            key="lastName"
          />
          <Column
            title="Age"
            dataIndex="age"
            key="age"
          />
          <Column
            title="Address"
            dataIndex="address"
            key="address"
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a href="#">Action 一 {record.lastName}</a>
                <span className="ant-divider"/>
                <a href="#">Delete</a>
                <span className="ant-divider"/>
                <a href="#" className="ant-dropdown-link">
                  More actions <Icon type="down"/>
                </a>
              </span>
            )}
          />
        </Table>
      </PageHeaderLayout>

    );
  }
}
