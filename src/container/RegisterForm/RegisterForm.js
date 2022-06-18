import React, { Component } from 'react'
import Input from '../input/input';

export class RegisterForm extends Component {
  state = {
    formData: {
      name: {
        value: '',
        validator: {
          minlength: 3,
          maxlength: 6,
          required: true
        },
        error: {status: true, message: "", isTouched: false},
      },
      phoneNumber: {
        value: '',
        validator: {
          minlength: 10,
          maxlength: 10
        },
        error: {status: true, message: "", isTouched: false},
      },
      email: {
        value: '',
        validator: {
          required: true
        },
        error: {status: true, message: "", isTouched: false},
      },
      password: {
        value: '',
        validator: {
          minlength: 6,
          maxlength: 24,
          required: true
        },
        error: {status: true, message: "", isTouched: false},
      },
    },
      isFormValid: false
  }

  checkValue = (value, rules) => {
      let message;
      let isValid = true; // เป็นค่าเริ่มต้น เผื่อบาง state ไม่มี rules จะได้ run ได้ ถ้ามี rules ค่อยมาเช็คกับ rules ว่าตรงตามที่กำหนดมั้ยถ้าไม่ค่อยส่งไปว่า isValid: false
      let trimValue = value.trim();

      if(rules.minlength && trimValue.length < rules.minlength ) {
        isValid = false;
        message = `คุณต้องกรอกอย่างน้อย ${rules.minlength} ตัว`
      }

      if(rules.maxlength && trimValue.length > rules.maxlength ) {
        isValid = false;
        message = `คุณต้องกรอกไม่เกิน ${rules.maxlength} ตัว`
      }

      if(rules.required && trimValue.length === 0) {
        isValid = false;
        message = `คุณต้องกรอกช่องนี้`
      }
      return {isValid, message}
  }

  onChangeInput = (e) => {
    e.preventDefault()
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const updateForm = {...this.state.formData};
    updateForm[fieldName].value = fieldValue;

    let {isValid, message} = this.checkValue(fieldValue, updateForm[fieldName].validator)

    updateForm[fieldName].error.status = !isValid;
    updateForm[fieldName].error.message = message;
    updateForm[fieldName].error.isTouched = true;

    let newIsFormValid = true;
    for(let fn in updateForm) {
      if(updateForm[fn].validator.required === true){
        newIsFormValid = !updateForm[fn].error.status && newIsFormValid;
      }
    }

    this.setState({
      formData: updateForm,
      isFormValid: newIsFormValid
    })
  }

  onSubmitForm = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    const {name, phoneNumber, email, password} = this.state.formData
    const {isFormValid} = this.state
    {console.log(this.state)}
    return (
      <div className='RegisterForm'>
        <form onSubmit={this.onSubmitForm}>
          <Input 
            onChangeInput={this.onChangeInput} 
            value={name.value}
            name='name' 
            placeholder='ชื่อ' 
            error={name.error}
            />
          <Input 
            onChangeInput={this.onChangeInput} 
            value={phoneNumber.value} 
            name='phoneNumber' 
            placeholder='เบอร์โทรศัพท์' 
            error={phoneNumber.error}
            />
          <Input 
            onChangeInput={this.onChangeInput} 
            value={email.value} 
            name='email' 
            placeholder='อีเมลล์' 
            error={email.error}
            />
          <Input 
            onChangeInput={this.onChangeInput} 
            value={password.value}
            name='password' 
            placeholder='รหัสผ่าน'
            type='password'
            error={password.error}
            />

          <button disabled={!isFormValid} htmlFor="submit" className='Button'>Register</button>
        </form>
      </div>
    )
  }
}

export default RegisterForm
