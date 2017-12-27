/**
 * Created by zhengan on 2017/12/11.
 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Table,
  Popconfirm,
  Divider,
} from 'antd';
import StandardTable from '../../../components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import StandardFormRow from '../../../components/StandardFormRow';
import TagSelect from '../TagSelect';
import OperationQuestionsTable from '../../../components/custom/OperationQuestionsTable';
import AvatarList from '../../../components/AvatarList';

import styles from './index.less';
const {Column, ColumnGroup} = Table;
const FormItem = Form.Item;
const {Option} =Select;

@connect(state => ({
  question: state.question,
}))
@Form.create()
export default class QuestionFilter extends PureComponent {
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
        this.setState({
          knowledgeNode: res
        })
      }
    });
  }


  filterKnowledgeChapterFromLevel(currentLevel) {
    const {knowledgeChapter}=this.props.question;
    const newKnow = knowledgeChapter.filter((val)=> val.level == currentLevel);
    this.setState({
      knowledgeChapter: newKnow
    });
  }

  changeLevel = (checkedTag) => {
    this.setState({
      currentLevel: checkedTag[0]
    });
    this.filterKnowledgeChapterFromLevel(checkedTag);
  }
  changeKnowledgeChapter = (checkedTag) => {
    this.setState({
      currentChapter: checkedTag[0]
    });
    const {dispatch}=this.props;
    dispatch({
      type: 'question/getKnowledgeNodeFromChapter',
      payload: checkedTag[0]
    }).then(()=>{
      this.setState({
        knowledgeNode:this.props.question.knowledgeNode
      })
    });
  }
  changeKnowledgeNode = (checkedTag) => {
    this.setState({
      currentNode: checkedTag[0]
    });
  }


  renderTagSelect() {
    const {level} =this.state;
    const newArr = level.map((val)=>(
      <TagSelect.Option value={val} key={val}>{val}</TagSelect.Option>
    ));
    return newArr;
  }

  renderKnowledgeChapter() {
    const {knowledgeChapter} =this.state;
    const newArr = knowledgeChapter.map((val)=>(
      <TagSelect.Option value={val.id} key={val.id}>{val.name}</TagSelect.Option>
    ));
    return newArr;
  }

  renderKnowledgeNode() {
    const {knowledgeNode} =this.state;
    const newArr = knowledgeNode.map((val)=>(
      <TagSelect.Option value={val.id} key={val.id}>{val.name}</TagSelect.Option>
    ));
    return newArr;
  }

  handleClickOk(){
    const filters={
      level:this.state.currentLevel,
      chapterId:this.state.currentChapter,
      nodeId:this.state.currentNode,
    }
    this.props.onFilter(filters);
  }


  render() {
    const {form}=this.props;
    const {getFieldDecorator} = form;
    const pageHeaderContent = (
      <div style={{textAlign: 'center'}}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{width: 522}}
        />
      </div>
    );
    return (
      <Form layout="inline">
        <StandardFormRow title="" block style={{paddingBottom: 11}}>
          <FormItem>
            {
              <TagSelect onChange={this.changeLevel} expandable>
                {this.renderTagSelect()}
              </TagSelect>
            }
          </FormItem>
        </StandardFormRow>
        <StandardFormRow title="" block style={{paddingBottom: 11}}>
          <FormItem>
            {
              <TagSelect onChange={this.changeKnowledgeChapter} expandable>
                {this.renderKnowledgeChapter()}
              </TagSelect>
            }
          </FormItem>
        </StandardFormRow>
        <StandardFormRow title="" block style={{paddingBottom: 11}}>
          <FormItem>
            {
              <TagSelect onChange={this.changeKnowledgeNode} expandable>
                {this.renderKnowledgeNode()}
              </TagSelect>
            }
          </FormItem>
        </StandardFormRow>
        <StandardFormRow style={{paddingBottom: 11,textAlign:'right'}}>
          <FormItem >
            <Button type="primary" onClick={this.handleClickOk.bind(this)}>确定</Button>
          </FormItem>
        </StandardFormRow>
      </Form>
  );
  }
}
