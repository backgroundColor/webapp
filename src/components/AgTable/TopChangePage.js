import React from 'react'
import classes from './AgTable.css'
import R from 'ramda'
type Props = {
  total: Number
}
export default class TopChangeNum extends React.Component {
  props: Props
  state = {
    currentNum: 1
  }
  componentDidMount () {
    this.refs.preBtn.onclick = () => {
      document.querySelector('#btPrevious').click()
      this.setState({
        currentNum: document.querySelector('#current').value
      })
    }
    this.refs.nextBtn.onclick = () => {
      document.querySelector('#btNext').click()
      this.setState({
        currentNum: document.querySelector('#current').value
      })
    }
    setTimeout(() => {
      document.querySelector('#btPrevious').onclick = () => {
        this.setState({
          currentNum: document.querySelector('#current').value
        })
      }
      document.querySelector('#btNext').onclick = () => {
        this.setState({
          currentNum: document.querySelector('#current').value
        })
      }
      document.querySelector('#current').onkeyup = (e) => {
        const reg = /^\+?[1-9][0-9]*$/
        if (reg.test(e.target.value)) {
          this.setState({
            currentNum: parseInt(event.target.value)
          })
        }
      }
    }, 500)
  }
  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps, this.props)) {
      this.setState({
        currentNum: 1
      })
    }
  }
  render () {
    return (
      <div className={classes['ag-table-top-page-change']}>
        <button ref='preBtn'>
          <i className="fa fa-angle-left" aria-hidden="true"></i>
        </button>
          {this.state.currentNum}/{
            this.props.total
              ? this.props.total
                : '...'
          }
        <button ref='nextBtn'>
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </button>
      </div>
    )
  }
}
