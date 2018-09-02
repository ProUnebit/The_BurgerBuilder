import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../Input/Input';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        }

        render() {

            let { error } = this.state;

            return (
                <Input>
                    <Modal
                        show = {error}
                        modalClosed = {this.errorConfirmedHandler}
                        >{error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Input>
            )
        }
    }
}

export default withErrorHandler;
