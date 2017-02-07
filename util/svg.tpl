import React from 'react';
import classnames from 'classnames';

module.exports = React.createClass({

    displayName: <%= JSON.stringify(displayName) %>,

    getDefaultProps () {
        return <%= JSON.stringify(defaultProps) %>;
    },

    render () {
        const {onClick, className, ...others} = this.props;

        return (
            <div onClick={onClick} className={classnames('t-icon t-svg', {
               [className]: !!className
            })}>
                <svg {...others}>
                    <%= innerXml %>
                </svg>
                <div className="t-icon-mask"></div>
            </div>
        );
    }
});