export default function SvgFloorPolygonTooltip({
  x,y, title, description, isActive
}) {

  const className = isActive ? 'SvgFloorPolygonTooltip--active' : '';

  return `
    <foreignObject x="${x}" y="${y}" width="80" height="100" class="SvgFloorPolygonTooltip-wrapper">
      <div class="SvgFloorPolygonTooltip ${className}">
        <div class="SvgFloorPolygonTooltip__title">${title}</div>
        <div class="SvgFloorPolygonTooltip__description">${description}</div>
      </div>
    </foreignObject>
  `
}