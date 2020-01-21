
// outsource dependencies
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import React, { PureComponent } from 'react';

// local dependencies
import { RFControlWrap } from './redux-form-helpers';

export class RFInput extends PureComponent {
    static propTypes = {
        type: PropTypes.string,
        filter: PropTypes.func,
        skipTouch: PropTypes.bool,
        className: PropTypes.string,
        meta: PropTypes.object.isRequired,
        input: PropTypes.object.isRequired,
        label: RFControlWrap.propTypes.label,
        usePopover: RFControlWrap.propTypes.usePopover,
        classNameFormGroup: RFControlWrap.propTypes.className,
    };

    static defaultProps = {
        label: null,
        type: 'text',
        className: '',
        filter: e => e,
        skipTouch: false,
        usePopover: null,
        classNameFormGroup: '',
    };

    handleDrop = event => {
        event.preventDefault();
        event.stopPropagation();
        const { input, type, filter } = this.props;
        switch (type) {
            default: return; // NOTE do nothing by default
            case 'text': return input.onChange(filter(event.dataTransfer.getData('text')));
        }
    };

    handleBlur = event => this.props.input.onBlur(this.props.filter(event.target.value));

    handleChange = event => this.props.input.onChange(this.props.filter(event.target.value));

    render () {
        const { input, meta, label, skipTouch, usePopover, classNameFormGroup, filter, ...attr } = this.props;
        let message = '';
        if (skipTouch || meta.touched) {
            message = meta.error;
            attr.className += meta.valid ? ' is-valid' : ' is-invalid';
        }
        return <RFControlWrap
            label={label}
            id={input.name}
            message={message}
            usePopover={usePopover}
            className={classNameFormGroup}
        >
            <Input
                dir="auto"
                id={input.name}
                autoComplete="off"
                {...input}
                {...attr}
                onDrop={this.handleDrop}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
            />
        </RFControlWrap>;
    }
}

export default RFInput;

