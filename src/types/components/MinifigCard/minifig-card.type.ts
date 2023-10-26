export type MinifigCardProps = {
    minifig : MinifigProps;
}

export type MinifigProps = {
    last_modified_dt ?: string;
    name ?: string;
    num_parts ?: number;
    set_img_url ?: string;
    set_num ?: string;
    set_url ?: string;
}