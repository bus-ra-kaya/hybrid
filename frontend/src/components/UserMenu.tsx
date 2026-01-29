import { useState } from "react";

export default function UserMenu(){
  const [isOpen, setIsOpen] = useState<boolean>(false);
  

  return(
    <div>
      <button onClick={() => {setIsOpen(prev => !prev)}}></button>
      <div></div>
      {isOpen && (
        <div>

          
        </div>
      )}
    </div>
  )
}