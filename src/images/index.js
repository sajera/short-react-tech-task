
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// local dependencies
import defImg from './def-image.svg';
import defaultAvatar from './default_avatar.svg';

export class DefImage extends PureComponent {
    static propTypes = {
        src: PropTypes.string,
        alt: PropTypes.string,
        title: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
        defaultSrc: PropTypes.string,
        defaultAlt: PropTypes.string,
        defaultTitle: PropTypes.string,
        defaultStyle: PropTypes.object,
        defaultClassName: PropTypes.string,
    };

    static defaultProps = {
        src: null,
        alt: null,
        title: null,
        style: {},
        className: null,
        defaultSrc: defImg,
        defaultAlt: 'image',
        defaultClassName: '',
        defaultTitle: '',
        defaultStyle: {},
    };

    src = () => this.props.src || this.props.defaultSrc;

    alt = () => this.props.alt || this.props.defaultAlt;

    title = () => this.props.title || this.props.defaultTitle;

    className = () => this.props.className || this.props.defaultClassName;

    style = () => Object.assign({}, this.props.defaultStyle, this.props.style);

    render () {
        return <img
            src={this.src()}
            alt={this.alt()}
            title={this.title()}
            style={this.style()}
            className={this.className()}
        />;
    }
}

export default DefImage;

export const Avatar = props => <DefImage
    defaultAlt="User"
    defaultTitle="User"
    defaultSrc={defaultAvatar}
    defaultStyle={{ borderRadius: '50%' }}
    {...props}
/>;
