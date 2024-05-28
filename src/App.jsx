import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge, NodeToolbar,
} from 'reactflow';

import 'reactflow/dist/style.css';
import SideBar from './components/SideBar';
import TextUpdaterNode from './components/Node';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialNodes = [
    { id: '1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { label: '1', text: '' } },
    { id: '2', type: 'textUpdater', position: { x: 0, y: 100 }, data: { label: '2', text: '' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


export default function App() {
    const nodeTypes = useMemo(() => ({textUpdater : TextUpdaterNode}), []);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [focusedNode, setFocusedNode] = useState(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onNodeClick = (event, node) => {
        setFocusedNode(node);
        // Optionally, you can perform additional actions here
      };

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ToastContainer />
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                onPaneClick={() => setFocusedNode(null)}
                onDrop={(e) => {
                    e.preventDefault();
                    const data = JSON.parse(e.dataTransfer.getData('application/json'));
                    const { clientX, clientY } = e;
                    const x = clientX - e.currentTarget.getBoundingClientRect().left;
                    const y = clientY - e.currentTarget.getBoundingClientRect().top;
                    setNodes((nodes) => [...nodes, { ...data, position: { x, y } }]);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
            >
                <Controls />
                <MiniMap />
                <NodeToolbar />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
            <SideBar
                setNodes={setNodes}
                focusedNode={focusedNode}
                nodes={nodes}
                edges={edges}
            />
        </div>
    );
}
