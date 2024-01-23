type Node = {
	x: number;
	y: number;
};

export const drawNodes = ({
	canvas,
	nodes,
	nodeRadius = () => 1,
	nodeFill = () => 'white',
	nodeStroke = () => 'transparent',
	showLabels = false,
	nodeLabel = () => '',
	nodeLabelColor = () => 'white',
	nodeLabelFont = () => '10px Source Code Pro'
}: {
	canvas: HTMLCanvasElement;
	nodes: Node[];
	nodeRadius?: (node: Node) => number;
	nodeFill?: (node: Node) => string;
	nodeStroke?: (node: Node) => string;
	showLabels?: boolean;
	nodeLabel?: (node: Node) => string;
	nodeLabelColor?: (node: Node) => string;
	nodeLabelFont?: (node: Node) => string;
}) => {
	const context = canvas?.getContext('2d');

	if (context) {
		context.clearRect(0, 0, canvas.width, canvas.height);

		nodes.forEach((node) => {
			context.beginPath();
			const r = nodeRadius(node);

			context.arc(node.x, node.y, r, 0, 2 * Math.PI);

			context.fillStyle = nodeFill(node);
			context.fill();

			context.strokeStyle = nodeStroke(node);
			context.lineWidth = 1;
			context.stroke();

			if (showLabels) {
				context.font = nodeLabelFont(node);

				context.fillStyle = nodeLabelColor(node);

				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillText(nodeLabel(node), node.x, node.y);
			}
		});
	}
};
