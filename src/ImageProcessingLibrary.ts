import { CONTENT_OF_PROCESSED_IMAGE } from "./constants";

export class ImageProcessingLibrary{

    public async processImage(image: string) : Promise<string> {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return CONTENT_OF_PROCESSED_IMAGE;
    }
}