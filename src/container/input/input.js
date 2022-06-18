import React, { Component } from 'react'

export class Input extends Component {

    getClassCSS = () => {
        let cssClass = 'Input InputElement'
        if(this.props.error.status && this.props.error.isTouched) {
            cssClass += " Invalid";
        }
        return cssClass;
        // {console.log(cssClass)}
    }
  render() {
    return (
    <>
        <input
            onChange={this.props.onChangeInput} 
            value={this.props.value} 
            className={this.getClassCSS()}
            name={this.props.name} 
            type={this.props.type}
            placeholder={this.props.placeholder}
        />
      <p className='ErrorMessage'>{this.props.error.message}</p>
    </>
    )
  }
}

export default Input
