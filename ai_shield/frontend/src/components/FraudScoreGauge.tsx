import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type FraudScoreGaugeProps = {
  score: number;
  label: string;
};

export default function FraudScoreGauge({ score, label }: FraudScoreGaugeProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 200;
    const height = 120;
    const margin = 10;
    const radius = Math.min(width, height * 2) / 2 - margin;
    
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height - margin})`);

    // Scale for the arc
    const scale = d3.scaleLinear()
      .domain([0, 1])
      .range([-Math.PI / 2, Math.PI / 2]);

    // Color interpolator
    const colorScale = d3.scaleLinear<string>()
      .domain([0, 1])
      .range(["#1B5E20", "#B71C1C"]);

    // Background arc
    const arc = d3.arc<any>()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    svg.append("path")
      .datum({})
      .attr("class", "background-arc")
      .attr("d", arc)
      .style("fill", "#E5E7EB");

    // Foreground arc
    const foregroundArc = d3.arc<any>()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .cornerRadius(10);

    const path = svg.append("path")
      .datum({ endAngle: -Math.PI / 2 })
      .style("fill", colorScale(score))
      .attr("d", foregroundArc);

    // Animate arc
    path.transition()
      .duration(1500)
      .ease(d3.easeCubicOut)
      .attrTween("d", function(d: any) {
        const targetAngle = scale(score);
        const interpolate = d3.interpolate(d.endAngle, targetAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return foregroundArc(d) || "";
        };
      });

    // Add needle
    const pointer = svg.append("g")
        .attr("transform", `rotate(${-90})`);
    
    pointer.append("path")
        .attr("d", "M -10 0 L 0 -15 L 10 0 A 10 10 0 1 1 -10 0")
        .style("fill", "#0A2540");
        
    pointer.append("circle")
        .attr("r", 5)
        .style("fill", "#FFFFFF");

    pointer.transition()
      .duration(1500)
      .ease(d3.easeCubicOut)
      .attrTween("transform", function() {
        const interpolate = d3.interpolate(-90, (score * 180) - 90);
        return function(t) {
          return `rotate(${interpolate(t)})`;
        };
      });

  }, [score]);

  return (
    <div className="flex flex-col items-center justify-center">
      <svg ref={svgRef}></svg>
      <div className="text-3xl font-sora font-bold text-dark mt-2">{score.toFixed(2)}</div>
    </div>
  );
}
