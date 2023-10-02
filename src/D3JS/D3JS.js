import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3JS = ({ dataSource }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (dataSource.length === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const colorScale = d3.scaleOrdinal()
      .domain(dataSource.map((v) => v.title)) // Change 'label' to 'title'
      .range([
        '#ffcd56',
        '#ff6384',
        '#00ff00',
        '#fd6b19',
        '#ffbf00',
        '#6495ED',
        '#808080',
        '#008000'
      ]);

    const pie = d3.pie()
      .sort(null)
      .value((d) => d.budget);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    g.selectAll('path')
      .data(pie(dataSource))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => colorScale(d.data.title)) // Change 'data.label' to 'data.title'
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(radius);

    g.selectAll('text')
      .data(pie(dataSource))
      .enter()
      .append('text')
      .text((d) => d.data.title) // Change 'data.label' to 'data.title'
      .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }, [dataSource]);

  return (
    <div className="chart-container" style={{ width: 450, height: 500 }}>
      <h2 style={{ textAlign: "center" }}>D3JS Pie Chart</h2>
      <svg ref={svgRef} width={400} height={400}>
        {dataSource.length === 0 && (
          <text x="50%" y="50%" textAnchor="middle">Loading...</text>
        )}
      </svg>
    </div>
  );
};

export default D3JS;
