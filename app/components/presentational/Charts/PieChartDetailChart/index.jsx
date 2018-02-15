import React from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer  } from 'recharts';
import Styles from '../styles.css';

export default class PieChartComponent extends React.Component {

    constructor() {
        super();
        this.state = { activeIndex: 0 };
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
                  
                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={"red"}
                    />
                    <Sector
                        cx={cx}
                        cy={cy}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        innerRadius={outerRadius + 6}
                        outerRadius={outerRadius + 10}
                        fill={fill}
                    />
                    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                    <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={'start'} fill="#fff">
                        {`(${payload.name} ${(percent * 100).toFixed(2)}%)`}
                    </text>
                </g>
            );
        };

        return (<ResponsiveContainer  width={this.props.width} height={this.props.height}><PieChart> 
            <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.props.data}
                startAngle={this.props.startAngle}
                endAngle={this.props.endAngle}
                cy={this.props.cy}
                cx={this.props.cx}
                innerRadius={this.props.innerRadius}
                outerRadius={this.props.outerRadius}
                fill={this.props.fillColor}
                stroke={this.props.stroke}
                onMouseEnter={this.onPieEnter.bind(this)}
            />
        </PieChart></ResponsiveContainer>)
    }

    onPieEnter(data, index) {
        this.setState({ activeIndex: index});
    }
}