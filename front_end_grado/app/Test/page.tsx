"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import { Reorder } from "framer-motion";



const Test = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5])
  return (
    <div>
      <Reorder.Group values={items} onReorder={setItems}>
      {items.map((item, index) => (
        <Reorder.Item value={item} key={item}>
         <Card className="m-8">
         <CardHeader>
          <p className="text-md">Item: {index}</p>
         </CardHeader>
         <CardBody>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita animi voluptate quasi
             at! Corporis, voluptate quis laudantium veniam magni eligendi possimus debitis qui tempora,
             ipsam nihil, reiciendis nulla distinctio pariatur.</p>
 
         </CardBody>
         <CardFooter>
 
         </CardFooter>
 
       </Card>
       </Reorder.Item>
      ))};
</Reorder.Group>

     
    </div>
  );
};

export default Test;
