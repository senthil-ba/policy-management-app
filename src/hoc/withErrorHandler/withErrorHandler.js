import React, { Component } from 'react';
import CustomModal from '../../components/UI/CustomModal/CustomModal';
import axios from 'axios';

const withErrorHandler = (WrappedComponent) => {
    return class extends Component {
        state = {
            error: null,
            open: false
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null, open: false });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error, open: true });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null, open: false });
        }


        render() {
            let content = null; 
            if(this.state.error) {
                console.log('Inside error handler');
                console.log(this.state.error.message); 
                console.log(customErrorMessage[this.state.error.message]); 
                content = customErrorMessage[this.state.error.message] ? customErrorMessage[this.state.error.message]: null;
            }
            return (
                <React.Fragment>                    
                    <CustomModal content={content} open={this.state.open} handleClose={this.errorConfirmedHandler} />;
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

const customErrorMessage = {
    "Request failed with status code 400" : "Authentication Failed."
}

export default withErrorHandler;