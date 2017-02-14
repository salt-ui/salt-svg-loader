import React from 'react';
import classnames from 'classnames';
import svg4everybody from 'svg4everybody';

const webkitUA = /\bAppleWebKit\/(\d+)\b/;

module.exports = React.createClass({

    displayName: <%= JSON.stringify(displayName) %>,

    getDefaultProps () {
        return <%= JSON.stringify(defaultProps) %>;
    },

    componentDidMount() {
        const webkitUAVersion = (navigator.userAgent.match(webkitUA) || [])[1];
        svg4everybody({
            polyfill: webkitUAVersion === '600' || webkitUAVersion < 537,
        });
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