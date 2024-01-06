import { FileStorageLibrary } from "./FileStorageLibrary";
import { ImageProcessingLibrary } from "./ImageProcessingLibrary";
import { ERROR_DURING_PROCESS_IMAGE, ERROR_DURING_SAVING_FILE, ERROR_IMG_MUST_JPG, ERROR_NO_IMAGE, ERROR_NO_OUTPUT_PATH } from "./constants";
import { InvalidImageException } from "./exceptions/InvalidImageException";
import { ProcessingErrorException } from "./exceptions/ProcessingErrorException";

export class ImageProcessor {
    constructor(private imageProcessingLibrary: ImageProcessingLibrary, private fileStorageLibrary: FileStorageLibrary){}

    public async processAndSaveImage(inputPath: string, outputPath: string) : Promise<void>{
        let processedImageContent;
        this.validateImageName(inputPath);
        this.validateOutputPath(outputPath); 

        try {
            processedImageContent = await this.imageProcessingLibrary.processImage(inputPath);
        } catch (error) {
            throw new ProcessingErrorException(ERROR_DURING_PROCESS_IMAGE);
        }

        try {
            await this.fileStorageLibrary.saveContentIntoFile(outputPath, processedImageContent);
        } catch (error) {
            throw new ProcessingErrorException(ERROR_DURING_SAVING_FILE);
        }
    }

    private validateImageName(image: string) {
        if(!image){
            throw new InvalidImageException(ERROR_NO_IMAGE);
        }

        const extension = image.split('.')[1];

        if(extension !== 'jpg') {
            throw new InvalidImageException(ERROR_IMG_MUST_JPG);
        }
        
    }

    private validateOutputPath(path: string){
        if(!path){
            throw new InvalidImageException(ERROR_NO_OUTPUT_PATH);
        }
    }
}