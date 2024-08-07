'use client'

import { useState } from 'react';
import CollectionEditor from "@/app/components/CollectionEditor";
import Collection from "@/app/components/Collection";

// is there a better name for this component? 
export default function CollectionManager() {

  return (
    <div>
      <h1>Collection Manager</h1>
        <CollectionEditor />
        <Collection />
    </div>
    )
}