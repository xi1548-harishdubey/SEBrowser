﻿//******************************************************************************************************
//  EventSearchRelayPerformance.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  08/22/2019 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import React from 'react';
import OpenSEEService from '../../../TS/Services/OpenSEE';

export default class EventSearchBreakerPerformance extends React.Component<{ EventID: number }, { ShowRelayHistory: boolean }>{
    openSEEService: OpenSEEService;
    optionsTripTime: object;
    optionsPickupTime: object;
    optionsTripCoilCondition: object;
    optionsImax1: object;
    optionsImax2: object;

    constructor(props, context) {
        super(props, context);

        this.state = {
            ShowRelayHistory:false
        };

        this.optionsTripTime = {
            canvas: true,
            legend: { show: false },
            axisLabels: { show: true },
            grid: {
                autoHighlight: false,
                clickable: true,
                hoverable: true,
                markings: [],
            },
            xaxis: { show: false },
            yaxis: {
                show: true,
                axisLabel: 'Trip (micros)',
                labelWidth: 50,
            },
            points: {
                show: true,
                fill: true,
                fillColor: "#000000"
            },
            lines: {
                show: true,
            },
            series:
            {
                dashes:
                {
                    show: true,
                    dashLength: 5
                },
                shadowSize: 0
            }
        }

        this.optionsPickupTime = {
            canvas: true,
            legend: { show: false },
            axisLabels: { show: true },
            grid: {
                autoHighlight: false,
                clickable: true,
                hoverable: true,
                markings: [],
            },
            xaxis: { show: false },
            yaxis: {
                show: true,
                axisLabel: 'Pickup (micros)',
                labelWidth: 50,
            },
            points: {
                show: true,
                fill: true,
                fillColor: "#000000"
            },
            lines: {
                show: true,
            },
            series:
            {
                dashes: {
                    show: true,
                    dashLength: 5
                },
                shadowSize: 0
            }
        }

        this.optionsTripCoilCondition = {
            canvas: true,
            legend: { show: false },
            axisLabels: { show: true },
            grid: {
                autoHighlight: false,
                clickable: true,
                hoverable: true,
                markings: [],
            },
            xaxis: { show: false },
            yaxis: {
                show: true,
                axisLabel: 'TCC (A/s)',
                labelWidth: 50,
            },
            points: {
                show: true,
                fill: true,
                fillColor: "#000000"
            },
            lines: {
                show: true,
            },
            series:
            {
                dashes: {
                    show: true,
                    dashLength: 5
                },
                shadowSize: 0
            }
        }

        this.optionsImax1 = {
            canvas: true,
            legend: { show: false },
            axisLabels: { show: true },
            grid: {
                autoHighlight: false,
                clickable: true,
                hoverable: true,
                markings: [],
            },
            xaxis: { show: false },
            yaxis: {
                show: true,
                axisLabel: 'Imax 1 (A)',
                labelWidth: 50,
            },
            points: {
                show: true,
                fill: true,
                fillColor: "#000000"
            },
            lines: {
                show: true,
            }
        }

        this.optionsImax2 = {
            canvas: true,
            legend: { show: false },
            axisLabels: { show: true },
            grid: {
                autoHighlight: false,
                clickable: true,
                hoverable: true,
                markings: [],
            },
            xaxis: {
                mode: "time",
                reserveSpace: false,
                ticks: (axis) => {
                    var ticks = [],
                        delta = (axis.max - axis.min) / 11,
                        start = this.floorInBase(axis.min, axis.delta),
                        i = 0,
                        v = Number.NaN,
                        prev;

                    for (var i = 1; i < 11; ++i) {
                        ticks.push(axis.min + i * delta);
                    }

                    return ticks;
                },
                tickFormatter: (value, axis) => {
                    if (axis.delta < 1) {
                        return (moment(value).format("mm:ss.SS") + "<br>" + "Test");
                        // var trunc = value - this.floorInBase(value, 1000);
                        // return this.defaultTickFormatter(trunc, axis) + " ms";
                    }

                    if (axis.delta < 1000) {
                        return (moment(value).format("mm:ss.SS") + "<br>" + "Test");
                    }
                    else {
                        return moment(value).format("MM/DD/YY");
                    }
                },
                tickLength: 5
            },
            yaxis: {
                show: true,
                axisLabel: 'Imax 2 (A)',
                labelWidth: 50,
            },
            points: {
                show: true,
                fill: true,
                fillColor: "#000000"
            },
            lines: { show: true }
        }

    }

    componentDidMount() {
        this.getData(this.props);
    }
    componentWillUnmount() {
    }
    componentWillReceiveProps(nextProps) {
    }

    floorInBase(n, base) {
        return base * Math.floor(n / base);
    }

    getColor(label) {
        if (label.indexOf('VA') >= 0) return '#A30000';
        if (label.indexOf('VB') >= 0) return '#0029A3';
        if (label.indexOf('VC') >= 0) return '#007A29';
        if (label.indexOf('VN') >= 0) return '#c3c3c3';
        if (label.indexOf('IA') >= 0) return '#FF0000';
        if (label.indexOf('IB') >= 0) return '#0066CC';
        if (label.indexOf('IC') >= 0) return '#33CC33';
        if (label.indexOf('IR') >= 0) return '#c3c3c3';

        else {
            var ranNumOne = Math.floor(Math.random() * 256).toString(16);
            var ranNumTwo = Math.floor(Math.random() * 256).toString(16);
            var ranNumThree = Math.floor(Math.random() * 256).toString(16);

            return `#${(ranNumOne.length > 1 ? ranNumOne : "0" + ranNumOne)}${(ranNumTwo.length > 1 ? ranNumTwo : "0" + ranNumTwo)}${(ranNumThree.length > 1 ? ranNumThree : "0" + ranNumThree)}`;
        }
    }

    getData(props) {
        $(this.refs.TTwindow).children().remove();
        $(this.refs.PTwindow).children().remove();
        $(this.refs.TCCwindow).children().remove();
        $(this.refs.L1window).children().remove();
        $(this.refs.L2window).children().remove();

        var pixels = (window.innerWidth - 300 - 40) / 2;

        this.openSEEService.getStatisticData(props.eventid, pixels, "History").then(data => {

            if (data == null) {
                this.setState({ ShowRelayHistory: false })
                return;
            }
            this.setState({ ShowRelayHistory: true })

            var tripTimeVessel = [];
            var pickupTimeVessel = [];
            var tripCoilConditionVessel = [];
            var l1Vessel = [];
            var l2Vessel = [];

            $.each(data.Data, (index, value) => {
                if (value.MeasurementType == "TripTime") { tripTimeVessel.push({ label: value.ChartLabel, data: value.DataPoints, color: this.getColor(value.ChartLabel) }) }
                else if (value.MeasurementType == "PickupTime") { pickupTimeVessel.push({ label: value.ChartLabel, data: value.DataPoints, color: this.getColor(value.ChartLabel) }) }
                else if (value.MeasurementType == "TripCoilCondition") { tripCoilConditionVessel.push({ label: value.ChartLabel, data: value.DataPoints, color: this.getColor(value.ChartLabel) }) }
                else if (value.MeasurementType == "Imax1") { l1Vessel.push({ label: value.ChartLabel, data: value.DataPoints, color: this.getColor(value.ChartLabel) }) }
                else if (value.MeasurementType == "Imax2") { l2Vessel.push({ label: value.ChartLabel, data: value.DataPoints, color: this.getColor(value.ChartLabel) }) }

                else if (value.MeasurementType == "TripTimeAlert") { tripTimeVessel.push({ label: value.ChartLabel, data: value.DataPoints, color: '#FF0000', lines: { show: false }, points: { show: false } }) }
                else if (value.MeasurementType == "PickupTimeAlert") { pickupTimeVessel.push({ label: value.ChartLabel, data: value.DataPoints, color: '#FF0000', lines: { show: false }, points: { show: false } }) }
                else if (value.MeasurementType == "TripCoilConditionAlert") { tripCoilConditionVessel.push({ label: value.ChartLabel, data: value.DataPoints, color: '#FF0000', lines: { show: false }, points: { show: false } }) }
            });

            $.plot($(this.refs.TTwindow), tripTimeVessel, this.optionsTripTime);
            $.plot($(this.refs.PTwindow), pickupTimeVessel, this.optionsPickupTime);
            $.plot($(this.refs.TCCwindow), tripCoilConditionVessel, this.optionsTripCoilCondition);
            $.plot($(this.refs.L1window), l1Vessel, this.optionsImax1);
            $.plot($(this.refs.L2window), l2Vessel, this.optionsImax2);
        });


    }

    render() {
        return (
            <div className="card" >
                <div className="card-header">Historic Breaker Performance</div>
                <div className="card-body">
                    <div ref="TTwindow" style={{ height: 150, width: 'calc(100%)', /*, margin: '0x', padding: '0px'*/  display: this.state.ShowRelayHistory ? 'block' : 'none' }}></div>
                    <div ref="PTwindow" style={{ height: 150, width: 'calc(100%)', /*, margin: '0x', padding: '0px'*/  display: this.state.ShowRelayHistory ? 'block' : 'none' }}></div>
                    <div ref="TCCwindow" style={{ height: 150, width: 'calc(100%)', /*, margin: '0x', padding: '0px'*/  display: this.state.ShowRelayHistory ? 'block' : 'none' }}></div>
                    <div ref="L1window" style={{ height: 150, width: 'calc(100%)', /*, margin: '0x', padding: '0px'*/  display: this.state.ShowRelayHistory ? 'block' : 'none' }}></div>
                    <div ref="L2window" style={{ height: 150, width: 'calc(100%)', /*, margin: '0x', padding: '0px'*/  display: this.state.ShowRelayHistory ? 'block' : 'none' }}></div>
                </div>
            </div>
        );
    }
}
