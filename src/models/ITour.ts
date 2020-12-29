interface ITour {
    id: number;
    name: string;
    description: string;
    image_filename: string;
    place: string;
    difficulty: string;
    length: string;
    latitude: number;
    longitude: number;
    user: {
        id: string;
        display_name: string;
    }
    tour_upvotes_aggregate: {
        aggregate: {
          count: number;
        }
    }
};

export default ITour;