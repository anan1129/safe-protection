/**
 * Created by zhengan on 2017/11/29.
 */
import React,{PureComponent} from 'react';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './style.less';

export default class TestContentManage extends PureComponent{
  render(){
    return (
      <PageHeaderLayout title="TestContentManage" content="TestContentManage"></PageHeaderLayout>
    );
  }
}
