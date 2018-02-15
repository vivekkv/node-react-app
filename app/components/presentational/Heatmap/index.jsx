import React from 'react';
import { Raphael, Paper, Set, Circle, Ellipse, Image, Rect, Text, Path, Line } from 'react-raphael';

export default class Heatmap extends React.Component {

    render() {

        return <div id={this.props.chartElementId}></div>
    }

    componentDidUpdate() {

        let heatMapData = this.props.heatMapData;
        
        let data = this.parseData(heatMapData);
        let axisy = this.parseYaxis(heatMapData);
        let axisx = this.parseXaxis();

        let width = this.props.width;
        let height = 300;
        let leftgutter = 60;
        let bottomgutter = 20;
        let chartElementId =  this.props.chartElementId;

        let r = Raphael(chartElementId, width, height);
        let txt = { "font": '12px poppins', stroke: "none", fill: "#ccc" };
        let X = (width - leftgutter) / axisx.length;
        let Y = (height - bottomgutter) / axisy.length;

        let color = $("#" + chartElementId).css("color");

        let max = Math.round(X / 2) - 1;

        for (var i = 0, ii = axisx.length; i < ii; i++) {
            r.text(leftgutter + X * (i + .5), 294, axisx[i]).attr(txt);
        }

        for (var i = 0, ii = axisy.length; i < ii; i++) {
            r.text(45, Y * (i + .5), axisy[i]).attr(txt);
        }

        var o = 0;
        for (var i = 0, ii = axisy.length; i < ii; i++) {

            for (var j = 0, jj = axisx.length; j < jj; j++) {

                var R = data[o] && Math.min(Math.round(Math.sqrt(data[o] / Math.PI) * 4), max);

                if (R) {

                    (function (dx, dy, R, value) {


                        var color = "hsb(" + [(1 - R / max) * .5, 1, .75] + ")",
                            dt = r.circle(dx + 60 + R, dy + 10, R).attr({ stroke: "none", fill: color });


                        if (R < 6) {

                            var bg = r.circle(dx + 60 + R, dy + 10, 6).attr({ stroke: "none", fill: "#000", opacity: .4 }).hide();
                        }


                        var lbl = r.text(dx + 60 + R, dy + 10, data[o])
                            .attr({ "font": '10px "Helvetica Neue", Arial', stroke: "none", fill: "#fff" }).hide();


                        var dot = r.circle(dx + 60 + R, dy + 10, max).attr({ stroke: "none", fill: "#000", opacity: 0 });

                        dot.hover(function () {
                            if (bg) {
                                bg.show();
                            } else {
                                var clr = Raphael.rgb2hsb(color);
                                clr.b = .5;
                                dt.attr("fill", Raphael.hsb2rgb(clr).hex);
                            }
                            lbl.show();
                        }, function () {
                            if (bg) {
                                bg.hide();
                            } else {
                                dt.attr("fill", color);
                            }
                            lbl.hide();
                        });
                    })(leftgutter + X * (j + .5) - 60 - R, Y * (i + .5) - 10, R, data[o]);
                }
                o++;
            }
        }

    }

    parseData(heatMapData) {

        let data = [];
        heatMapData.forEach((day) => {

            for (let i = 1; i <= 24; i++) {

                let value = _.find(day.times, (j) => { return j.name == i });
                data.push(value ? value.count : null);
            }
        });

        return data;
    }

    parseYaxis(heatMapData) {

        let data = [];
        heatMapData.forEach((day) => {
            data.push(day.name);
        });

        return data;
    }

    parseXaxis() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    }

}