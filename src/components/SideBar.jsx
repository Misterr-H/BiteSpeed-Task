import messageIcon from '../assets/message.svg';
import { toast } from 'react-toastify';

const SideBar = ({
    setNodes,
    focusedNode,
    nodes,
    edges
}) => {
    return (
        <div className="fixed flex flex-col top-0 right-0 h-full w-64 bg-gray-200">
            <button className="bg-blue-500 h-10 text-white py-2 px-4 mt-4 mx-auto rounded hover:bg-blue-700" onClick={() => {
                if (nodes.length !== edges.length + 1) {
                    toast.error('Please connect all nodes with edges');
                    return;
                } else {
                    localStorage.setItem('nodes', JSON.stringify(nodes));
                    localStorage.setItem('edges', JSON.stringify(edges));
                    toast.success('Saved successfully');
                }
            }}>
                Save Changes
            </button>
            {/* Add your sidebar content here */}
            {!focusedNode && <div
            draggable={true}
            onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify({
                    id: (nodes.length + 1).toString(),
                    type: 'textUpdater',
                    position: { x: 0, y: 0 },
                    data: { label: (nodes.length + 1).toString(), text: '' }
                }));
            }}
            className='rounded-lg border-2 border-black p-6 m-2 flex-col flex items-center cursor-pointer shadow-lg'>
                <img src={messageIcon} alt="message" className="w-6 h-6 inline-block" />
                <span>
                    Text Message
                </span>
            </div>}
            {focusedNode && (
                <div className='rounded-lg border-2 border-black px-6 py-2 m-2 flex-col flex items-center cursor-pointer shadow-lg'>
                    <span className='p-1 bg-gray-600 text-white rounded-lg w-full text-center mb-5'>
                        Settings
                    </span>
                    <label>
                        Enter Message:
                    </label>
                    <input 
                    onChange={e => {
                        setNodes((nodes) => nodes.map((node) => {
                            if (node.id === focusedNode.id) {
                                return {
                                    ...node,
                                    data: {
                                        ...node.data,
                                        text: e.target.value,
                                    },
                                };
                            }
                            return node;
                        }));
                    }}
                    type="text" placeholder="Enter text here" className="w-40 h-10 p-2" />
                </div>
            )}
        </div>
    );
};

export default SideBar;