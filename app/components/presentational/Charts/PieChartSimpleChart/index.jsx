import React from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import Styles from '../styles.css';

export default class PieChartSimpleChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0, fillColor: props.colors[0] };
        this.onPieEnter = this.onPieEnter.bind(this);
    }

    render() {

        const renderActiveShape = (props) => {

            const RADIAN = Math.PI / 180;
            const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
            const sin = Math.sin(-RADIAN * midAngle);
            const cos = Math.cos(-RADIAN * midAngle);
            const sx = cx + (outerRadius + 10) * cos;
            const sy = cy + (outerRadius + 10) * sin;
            const mx = cx + (outerRadius + 30) * cos;
            const my = cy + (outerRadius + 30) * sin;
            const ex = mx + (cos >= 0 ? 1 : -1) * 22;
            const ey = my;
            const textAnchor = cos >= 0 ? 'start' : 'end';

            return (
                <g>
                    <text x={cx} fontSize={50} y={cy} dy={0} textAnchor="middle" fill={this.props.groupTextColor}>{payload[this.props.propertyTodispplay]}</text>
                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={this.state.fillColor}
                    />
                </g>
            );
        };

        const COLORS = this.props.colors;

        return (

            <ResponsiveContainer width={this.props.width} height={this.props.height}>

                <PieChart >

                    <Pie
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape}
                        data={this.props.data}
                        cy={this.props.cy}
                        cx={this.props.cx}
                        startAngle={this.props.startAngle}
                        endAngle={this.props.endAngle}
                        fill={this.state.fillColor}
                        innerRadius={this.props.innerRadius}
                        outerRadius={this.props.outerRadius}
                        stroke={this.props.stroke}
                        onMouseEnter={this.onPieEnter.bind(this)}
                        paddingAngle={0}>
                        {
                            this.props.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>

                </PieChart></ResponsiveContainer>)
    }

    onPieEnter(data, index) {

        const COLORS = this.props.colors;
        let fillColor = COLORS[index % COLORS.length]

        this.setState({ activeIndex: index, fillColor });
    }
}