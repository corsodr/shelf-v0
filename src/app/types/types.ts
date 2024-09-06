export interface APIPreview {
  url: string;
  domain: string;
  title: string;
  favicon: string;
  description: string;
  image: string;
}

export interface DBLinkPreview extends APIPreview {
  id: number; 
  createdAt: string;
}

  export interface DBCollection {
    id: number;
    name: string;
    linkPreviews: DBLinkPreview[];
  };