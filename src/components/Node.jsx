import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
  
const TextUpdaterNode = ({data}) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className='rounded-lg shadow-md shadow-black flex flex-col w-40'>
        <div className='bg-[#B0F1E2] py-1 px-2 rounded-tl-lg rounded-tr-lg'>
            <label htmlFor="text">Text:</label>
        </div>
        <span className='text-sm px-4 py-2'>
            {data.text ? data.text : `text message ${data.label}`}
            
        </span>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}

export default TextUpdaterNode;