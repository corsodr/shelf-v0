export interface APIPreview {
  url: string;
  domain: string;
  title: string;
  favicon: string;
  description: string;
  image: string;
}

export interface DBLinkPreview {
    id: number;
    url: string;
    title: string;
    domain: string;
    favicon: string;
    description: string;
    image: string;
    createdAt: string;
  }
  export interface DBCollection {
    id: number;
    name: string;
    linkPreviews: DBLinkPreview[];
  };