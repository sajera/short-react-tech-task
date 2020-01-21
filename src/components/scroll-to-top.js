
// outsource dependencies
// import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class ScrollToTop extends PureComponent {

    blocked = false;

    scrollRef = null;

    getRef = ref => {
        this.scrollRef = ref;
        if (this.scrollRef) {
            this.scrollRef.scrollToBottom();
        }
    };

    handleUpdate = scroll => {
        if (scroll.top <= 0.3 && !this.blocked) {
            this.blocked = true;
            this.props.onUpdate(scroll);
            setTimeout(() => this.blocked = false, 600);
        }
    };

    render = () => {
        const { onUpdate, ...attr } = this.props;
        return <Scrollbars
            autoHide
            ref={this.getRef}
            renderTrackHorizontal={() => <div />}
            renderThumbHorizontal={() => <div />}
            {...attr}
            onUpdate={this.handleUpdate}
        />;
    };
}
ScrollToTop.propTypes = {
    onUpdate: PropTypes.func.isRequired
};
export default ScrollToTop;
