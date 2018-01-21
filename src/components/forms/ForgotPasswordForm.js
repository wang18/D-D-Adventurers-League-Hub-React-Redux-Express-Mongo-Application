import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import Validator from 'validator';

class ForgotPasswordForm extends React.Component{
    state={
        data:{email:''},
        loading:false,
        errors:{}
    };

    onSubmit=(e)=>{
        e.preventDefault();
        const errors= this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length===0){
            this.setState({loading:true});
            this.props.submit(this.state.data)
                .catch(err => this.setState({errors: err.response.data.errors, loading: false}));
        }
    }

    validate = data => {
        const errors ={};
        if(!Validator.isEmail(data.email)) errors.email="Invalid email";
        return errors;
    };

    onChange = e =>
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [e.target.name]:e.target.value
            }
        });

    render(){
        const {errors,data,loading} = this.state;
        return(<Form onSubmit={this.onSubmit} loading={loading}>
            {!!errors.global && <Message negative>{errors.global}</Message>}
            <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input type="email"
                       name="email"
                       placeholder="email"
                       onChange={this.onChange}
                       value={data.email}
                />
                {errors.email && <InlineError text={errors.email}/>}
            </Form.Field>
            <Button primary>ForgotPasswordForm</Button>
        </Form>);
    }


}
ForgotPasswordForm.propTypes={
    submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm