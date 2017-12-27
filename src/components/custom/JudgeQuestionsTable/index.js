/**
 * Created by zhengan on 2017/12/10.
 */
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
import QuestionFilter from '../QuestionFilter';
import DymanicAddRadio from '../DynamicAddRadio';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import StandardFormRow from '../../../components/StandardFormRow';
import TagSelect from '../TagSelect';

import styles from './index.less';
const {Column, ColumnGroup} = Table;
const FormItem = Form.Item;
const {Option} =Select;

let _oq = '';
let _questionContent='';
let _answerContent='';

@connect(state => ({
  question: state.question,
}))
@Form.create()
export default class JudgeQuestionsTable extends PureComponent {
  state = {
    questions: this.props.sourceData || [],
    pagination:  {
      pageSize:5,
      page:0,
    },
    loading: this.props.loading || true,
    showModal: false,
    modalQuestion: {},
    modalType: false,
    level:this.props.question.level||[],
    knowledgeNode:this.props.question.knowledgeNode||[],
    knowledgeChapter:this.props.question.knowledgeChapter||[],
    answerContent:'',

  }

  componentDidMount() {
    this.getQuestions();
    this.getLevel();
    // this.getKnowledgeNode();
    this.getKnowledgeChapter();
  }

  getLevel(){
    const {dispatch} =this.props;
    dispatch({
      type:'question/getLevel',
    }).then(()=>{
      this.setState({
        level:this.props.question.level
      })
    })
  }
  getKnowledgeNode(){
    const {dispatch} =this.props;
    dispatch({
      type:'question/getKnowledgeNode',
    }).then(()=>{
      this.setState({
        knowledgeNode:this.props.question.knowledgeNode
      })
    })
  }
  getKnowledgeNodeFromChapter(params){
    const {dispatch} =this.props;
    dispatch({
      type:'question/getKnowledgeNodeFromChapter',
      payload:params,
    }).then(()=>{
      this.setState({
        knowledgeNode:this.props.question.knowledgeNode
      })
    })
  }
  getKnowledgeChapter(){
    const {dispatch} =this.props;
    dispatch({
      type:'question/getKnowledgeChapter',
    }).then(()=>{
      this.setState({
        knowledgeChapter:this.props.question.knowledgeChapter
      })
      this.getKnowledgeNode('');
    })
  }
  getQuestions(params) {
    const {dispatch}=this.props;
    const {pagination}=this.state;
    dispatch({
      type: 'question/getJudgeQuestions',
      payload:{
        size:pagination.pageSize,
        page:pagination.page,
        ...params,
      },
      callback: (res)=> {
        const {pagination}=this.state;
        pagination.total=res.totalElements;
        this.setState({
          questions: res.content,
          loading: false,
          pagination,
        });
        console.log(pagination);
      }
    });
  }

  renderQuestions() {
    const {questions, loading,pagination} =this.state;
    const dataSource = [];
    questions.forEach((val)=> {
      let data = {
        key: val.id,
        level: val.level,
        alive: val.alive,
        createdBy: val.createdBy,
        createdDate: val.createdDate,
      };
      val.key = val.id;
      dataSource.push(val);
    });
    const columns = [
      {title: '等级', dataIndex: 'level', key: 'level', sorter: (a, b) => a.level.length - b.level.length, },
      {title: '是否有效', dataIndex: 'alive', key: 'alive', sorter: (a, b) => a.alive.length - b.alive.length, },
      {
        title: '作者',
        dataIndex: 'createdBy',
        key: 'createdBy',
        sorter: (a, b) => a.createdBy.length - b.createdBy.length,

      },
      {
        title: '创建时间',
        dataIndex: 'createdDate',
        key: 'createdDate',
        sorter: (a, b) => a.createdDate.length - b.createdDate.length,

      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        fixed:'right',
        render: (text, record)=>(
          <span>
            <a onClick={()=>this.lookTable(record)}>查看</a>
            <Divider type="vertical"/>
            <a onClick={()=>this.editTable(record)}>修改</a>
            <Divider type="vertical"/>
            <Popconfirm title="是否确认删除?" onConfirm={()=>this.delQuestion(record)}><a >删除</a></Popconfirm>
          </span>
        )
      }

    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      },
      getCheckboxProps: record => ({
        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      }),
    };
    return (
      <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} onChange={this.handleTableChange.bind(this)} size="small" scroll={{x: 1300}} loading={loading} pagination={pagination}></Table>
    )
  }
  handleTableChange(pagination, filters, sorter) {
    console.log(pagination);
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.getQuestions({
      size:pagination.pageSize,
      page:pagination.current-1,
    })
  }

  delQuestion(record) {
    const {dispatch} =this.props;
    dispatch({
      type:'question/delJudgeQuestion',
      payload:record.id,
    }).then(()=>{
      this.setState({
        pagination:{
          page:0
        }
      })
      this.getQuestions();
    })
  }

  lookTable(record) {
    this.setState({
      showModal: true,
      modalQuestion: {...record},
      modalType: true,
    });
    this.props.form.setFieldsValue({
      questionAnswer:record.questionAnswer,
      level:record.level,
      alive:record.alive,
      knowledgeChapter:record.knowledgeNode&&record.knowledgeNode.chapter.id,
      knowledgeNode:record.knowledgeNode&&record.knowledgeNode.id,
    })
  }

  editTable(record) {
    this.setState({
      showModal: true,
      modalQuestion: record,
      modalType: false,
      answerContent:JSON.parse(record.questionChoose),
    });
    this.props.form.setFieldsValue({
      questionAnswer:record.questionAnswer,
      level:record.level,
      alive:record.alive,
      knowledgeChapter:record.knowledgeNode&&record.knowledgeNode.chapter.id,
      knowledgeNode:record.knowledgeNode&&record.knowledgeNode.id,
    })
  }


  renderModal() {
    const {modalQuestion, modalType,level,knowledgeNode,knowledgeChapter,answerContent} =this.state;
    const modules = {
      toolbar: [
        [{'header': [1, 2, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    };
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ];
    const {getFieldDecorator}=this.props.form;

    return (
      <Modal
        title={JSON.stringify(modalQuestion)=='{}'?'添加':(modalType ? '查看' : '修改')}
        visible={this.state.showModal}
        onOk={()=>this.saveModal()}
        onCancel={()=>this.cancelModal()}
        width="750px"
      >
        <Card title="问题">
          <ReactQuill modules={modules} formats={formats} value={modalQuestion.questionContext||''}
                      onChange={this.handleReactQuillQesutionChange.bind(this)} readOnly={modalType}/>
        </Card>
        {/*<Card title="答案设定">*/}
          {/*<DymanicAddRadio setValue={this.setValue.bind(this)} questionChoose={modalQuestion.questionChoose} disabled={modalType} ref="dynamicAddRadio"></DymanicAddRadio>*/}
        {/*</Card>*/}
        <Form layout="horizontal">
          <FormItem label="答案">
            {getFieldDecorator('questionAnswer', {})(
              <Select disabled={modalType}>
                <Option value="对">对</Option>
                <Option value="错">错</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="是否有效">
            {getFieldDecorator('alive', {})(
              <Select disabled={modalType}>
                <Option value="有效">有效</Option>
                <Option value="无效">无效</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="等级">
            {getFieldDecorator('level', {})(
              <Select disabled={modalType} onChange={this.changeLevel.bind(this)}>
                {level.map((item,key)=>(
                  <Option value={item} key={key}>{item}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="章">
            {getFieldDecorator('knowledgeChapter', {})(
              <Select disabled={modalType} onChange={this.changeKnowledgeChapter.bind(this)}>
                {knowledgeChapter.map((val,key)=>(
                  <Option value={val.id} key={key}>{val.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="节">
            {getFieldDecorator('knowledgeNode', {})(
              <Select disabled={modalType} >
                {knowledgeNode.map((val,key)=>(
                  <Option value={val.id} key={key}>{val.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
  forEachAnswer(){
    const {getFieldDecorator}=this.props.form;
    const {modalType,answerContent}=this.state;
    let arr=[];
    for(let k in answerContent){
      let obj={
        label:k,
        value:answerContent[k],
      };
      arr.push(obj);
    }
    return (
      <FormItem label="正确答案">
        {getFieldDecorator('questionAswer', {})(
          <Select disabled={modalType} onChange={this.changeQuestionAsnwer.bind(this)} >
            {arr.map((val,key)=>(
              <Option value={val.value} key={key}>{val.label+':'+val.value}</Option>
            ))}
          </Select>
        )}
      </FormItem>
    )

  }
  changeQuestionAsnwer(val){
    console.log(val);
  }

  setValue(values){
    console.log(values);
    _answerContent=values;
    this.setState({
      answerContent:values
    })
  }
  changeLevel(val){
    const newChapter=this.props.question.knowledgeChapter.filter((item)=> item.level==val);
    this.setState({
      knowledgeChapter:newChapter
    });
  }
  changeKnowledgeChapter(val){
    this.props.form.setFieldsValue({
      knowledgeNode:''
    });
    this.getKnowledgeNodeFromChapter(val);
  }


  saveModal() {
    const {form,dispatch}=this.props;
    const {modalQuestion,modalType}=this.state;
    if(modalType) {
      this.setState({
        showModal: false
      });
      return;
    };
    form.validateFields((err,values)=>{
      if(!err){
        let data=values;
        data.questionContext=_questionContent;
        data.questionChoose=JSON.stringify(_answerContent);
        data.knowledgeNode={id:data.knowledgeNode};
        delete data.knowledgeChapter;
        console.log(data);
        if(JSON.stringify(modalQuestion)=='{}'){
          dispatch({
            type:'question/postJudgeQuestions',
            payload:data,
          }).then(()=>{
            this.initModal();
            this.getQuestions();
            this.setState({
              showModal: false
            });
          })
        }else{
          data.id=this.state.modalQuestion.id;
          dispatch({
            type:'question/putJudgeQuestions',
            payload:data,
          }).then(()=>{
            this.initModal();
            this.getQuestions();
            this.setState({
              showModal: false
            });
          })
        }
      }
    })
  }

  initModal(){
    const {form}=this.props;
    form.resetFields();
    this.setState({
      modalQuestion:{},
      answerContent:{},
    });
  }

  cancelModal() {
    this.initModal();
    this.setState({
      showModal: false,
      modalType:false,
    });
  }

  handleReactQuillQesutionChange(val) {
    _questionContent=val;
  }
  handleReactQuillAnswerChange(val) {
    _answerContent=val;
  }

  addQuestion(){
    this.setState({
      showModal:true,
    });
  }

  onFilter(filters){
    this.getQuestions(filters);
  }


  render() {

    return (
      <div>
        {this.renderModal()}
        <QuestionFilter onChange={this.changeKnowledgeNode} onFilter={this.onFilter.bind(this)}></QuestionFilter>
        <div style={{marginBottom: 10}}>
          <Button type="primary" onClick={this.addQuestion.bind(this)}>添加</Button>
        </div>

        {this.renderQuestions()}
      </div>
    );
  }
}
