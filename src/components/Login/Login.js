import React from 'react'
import styles from './Login.css'
import { Form, Icon, Input, Button, notification } from 'antd'
const FormItem = Form.Item
type Props = {
  form: Object
}
class Login extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginFunc = this.loginFunc.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.loginFunc(values)
      }
    })
  }

  loginFunc (value) {
    fetch(`${__TASK_URL__}login`, {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: value
    })
    .then((res) => res.status === 200 && res.json())
    .then((json) => {
      if (json.code === 0) {
        console.info('success!!')
        notification['success']({
          message: '成功',
          description: '登陆成功！！'
        })
      } else {
        notification['error']({
          message: '失败',
          description: '登陆失败！！'
        })
      }
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        message: '错误',
        description: err
      })
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['login']}>
        <div className={styles['container']}>
          <div className={styles['login']}>
            <h2><i className='fa fa-lock' aria-hidden='true'>&nbsp;&nbsp;XXX</i></h2>
            <div className={styles['field']}>
              <Form onSubmit={this.handleSubmit} className='login-form'>
                <FormItem>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入用户名' }]
                  })(
                    <Input addonBefore={<Icon type='user' />} placeholder='用户名' />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('pass', {
                    rules: [{ required: true, message: '请输入密码!' }]
                  })(
                    <Input addonBefore={<Icon type='lock' />} type='password' placeholder='密码' />
                  )}
                </FormItem>
                <FormItem>
                  <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                    登陆
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Form.create()(Login)
