import React from 'react';
import PropTypes from "prop-types";

export default function withTooltip(Component) {
    class WrappedComponent extends React.Component {
        static propTypes = {
            children: PropTypes.any,
        };
        state = {
            tooltipOpen: false,
            tooltipPosition: null,
            tooltipData: null,
        };
        handleTooltipShow = (data, position) => {
            this.setState({
                tooltipData: data,
                tooltipOpen: true,
                tooltipPosition: position
            });
        };
        handleTooltipClose = () => {
            this.setState({
                tooltipData: null,
                tooltipOpen: false,
                tooltipPosition: null
            });
        };

        render() {
            return (<Component
                {...this.state}
                onTooltipClose={this.handleTooltipClose}
                onTooltipShow={this.handleTooltipShow}
                {...this.props}/>)
        }
    };

    return WrappedComponent;
}