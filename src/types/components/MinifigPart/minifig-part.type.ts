export type MinifigPartProps = {
    partItem : PartProps;
}

export type PartProps = {
    id ?: number;
    part ?: {
        name ?: string;
        part_img_url ?: string;
        part_num ?: string;
        part_url ?: string;
    };
}
