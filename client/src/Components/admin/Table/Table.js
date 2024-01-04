import React from 'react'

function Table({children,headers}) {
  return (
    <table className="min-w-full leading-normal">
    <thead>
        <tr>
            {headers?.map(hd=>{
                return(
                    <th
                    key={hd.id}
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {hd.title}
                </th>
                )
            })}
     
        </tr>
    </thead>
    <tbody>
      {children} 
      
    </tbody>
</table>
  )
}

export default Table