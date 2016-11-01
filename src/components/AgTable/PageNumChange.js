import React from 'react'
import classes from './AgTable.css'
type Props = {
  total: Number,
  onChange: Function,
  pagesize: Number,
  options: Array
}
export default class pageNumChange extends React.Component {
  props: Props;
  // constructor (props) {
  //   super(props)
  //
  // }
  componentDidUpdate () {
    console.log(this.props.options)
  }
  render () {
    return (
      <div className={classes['agtable-pagenum-change']}>
        <select onChange={this.props.onChange} defaultValue={this.props.pagesize}>
          {
            this.props.options.map(num => {
              return <option key={num}>{num}</option>
            })
          }
        </select>
        条/页  共<span>{this.props.total}</span>条
      </div>
    )
  }
}
