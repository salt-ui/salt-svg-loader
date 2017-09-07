import React from 'react';
import classnames from 'classnames';

const webkitUA = /\bAppleWebKit\/(\d+)\b/;

module.exports = React.createClass({

    displayName: <%= JSON.stringify(displayName) %>,

    getDefaultProps () {
        return <%= JSON.stringify(defaultProps) %>;
    },

    render () {
        const {onClick, className, ...others} = this.props;

        return (
            <div
                onClick={onClick}
                style={{
                    display: 'inline-block',
                    lineHeight: 0
                }}
                className={classnames('t-icon t-svg', {
                   [className]: !!className
                })}
            >
                <div style={{ position: 'relative' }}>
                    <svg {...others}>
                        <%= innerXml %>
                    </svg>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                        className="t-icon-mask"
                    ></div>
                </div>
            </div>
        );
    }
});