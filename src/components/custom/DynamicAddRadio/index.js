/**
 * Created by zhengan on 2017/12/14.
 */
import React, {PureComponent} from 'react';
import {Form, Input, Icon, Button} from 'antd';
const FormItem = Form.Item;

import styles from './index.less';

let _form;

let uuid = 0;
class DynamicFieldSet extends React.Component {
  state = {
    disabled: false,
    questionChoose: this.props.questionChoose,
  }

  componentDidMount() {
    _form=this.props.form;
  }

  componentWillReceiveProps(props) {

  }

  initForm(){
    form.resetFields();
  }

  remove = (k) => {
    const {form} = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const {form} = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.fromIndexToWord(uuid - 1));
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          disabled: true
        });
        let arr = [], obj = {};

        for (let v in values) {
          if (v != 'keys') {
            arr.push(values[v]);
          }
        }
        arr.forEach((val, key)=> {
          const objK = this.fromIndexToWord(key);
          obj[objK] = val;
        });
        this.props.setValue(obj);
      }
    });
  }

  fromIndexToWord(index) {
    index += 65;
    return String.fromCharCode(index);
  }

  editQuestionChoose() {
    this.setState({
      disabled: false
    })
  }

  parseJsonQuestionChoose() {
    const {questionChoose}=this.state;
    const {form} = this.props;
    if (!questionChoose) return;

    uuid = questionChoose.split(',').length;
    // if(!json) return null;
    // const {form}=this.props.form;
    // let questionChooseObj=JSON.parse(json);
    // let keys=[];
    // for(let v in questionChooseObj){
    //   uuid++;
    //   keys.push(v);
    //
    // }
    // form.setFieldsValue({
    //   keys:keys,
    //
    // })

    // can use data-binding to get
    // const keys = [];
    // const nextKeys = keys.concat(this.fromIndexToWord(uuid-1));
    // can use data-binding to set
    // important! notify form to detect changes
  }

  renderQuestionChoose(q) {
    if (!q || q == '{}') return null;
    return q.slice(1, -1).split(',').map((val,k)=> {
      return (
        <p key={k}>{val}</p>
      )
    })
  }

  render() {
    const {form:{getFieldDecorator, getFieldValue}, questionChoose} = this.props;
    const {disabled}=this.state;
    // this.parseJsonQuestionChoose();
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 4},
      },
    };
    getFieldDecorator('keys', {initialValue: []});
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...formItemLayout}
          label={this.fromIndexToWord(index)}
          required={false}

          key={index}
        >

          {getFieldDecorator(`${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "不能为空！",
            }],
          })(
            <Input placeholder="" style={{width: '80%', marginRight: 8}} disabled={disabled}/>
          )}
          {!disabled ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderQuestionChoose(questionChoose)}
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{width: '80%'}} disabled={disabled || this.props.disabled}>
            <Icon type="plus"/> 添加
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" disabled={disabled || this.props.disabled}>确定</Button>
          <Button style={{marginLeft: '10px'}} type="danger" htmlType="reset"
                  disabled={!disabled || this.props.disabled} onClick={this.editQuestionChoose.bind(this)}>修改</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

export default class DynamicAddRadio extends PureComponent {

  initForm(){
    _form.resetFields();
  }

  render() {

    return (
      <WrappedDynamicFieldSet {...this.props} ></WrappedDynamicFieldSet>
    );
  }
}
