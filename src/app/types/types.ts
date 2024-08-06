// customize session type? 
// get feedback 
// goal is rock solid data flow

export interface ApiPreview {
  url: string;
  domain: string;
  title: string;
  favicon: string;
  description: string;
  image: string;
}

export interface Preview {
    id: string;
    url: string;
    title: string;
    favicon: string;
    description: string;
    image: string;
    created_at: string;
  }

  export interface Collection {
    id: string;
    name: string;
    link_previews: Preview[];
  }