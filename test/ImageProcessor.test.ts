import { FileStorageLibrary } from "../src/FileStorageLibrary";
import { ImageProcessingLibrary } from "../src/ImageProcessingLibrary";
import { ImageProcessor } from "../src/ImageProcessor"
import { mock, mockReset } from 'jest-mock-extended'
import { ERROR_DURING_PROCESS_IMAGE, ERROR_DURING_SAVING_FILE, ERROR_IMG_MUST_JPG, ERROR_NO_IMAGE, ERROR_NO_OUTPUT_PATH } from "../src/constants";

const mockImageProcessingLibrary = mock<ImageProcessingLibrary>();
const mockFileStorageLibrary = mock<FileStorageLibrary>();

describe('ImageProcessor:', ()=>{
    let imageProcessor: ImageProcessor;

    beforeEach(()=>{
        mockReset(mockImageProcessingLibrary);
        mockReset(mockFileStorageLibrary);

        imageProcessor = new ImageProcessor(mockImageProcessingLibrary,mockFileStorageLibrary);
    })

    it('should process and save image', async ()=>{
        // Arrange
        const inputPath = 'image.jpg';
        const processedImageContent = "Processed image content";
        const outputPath = '/uploaded-images/'

        // Act
        mockImageProcessingLibrary.processImage.calledWith(inputPath).mockResolvedValue(processedImageContent);
        mockFileStorageLibrary.saveContentIntoFile.calledWith(outputPath, processedImageContent);

        await imageProcessor.processAndSaveImage(inputPath, outputPath)
        
        
        // Asset
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(1);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledWith(inputPath);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(1);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledWith(outputPath, processedImageContent);
    });

    it('should throw error during processing image', async ()=>{
        // Arrange
        const inputPath = 'image.jpg';
        const outputPath = '/uploaded-images/';
        const processedImageContent = "Processed image content";
        const errorMessage = ERROR_DURING_PROCESS_IMAGE;
        const errorExpected = new Error(errorMessage);

        // Act
        mockImageProcessingLibrary.processImage.calledWith(inputPath).mockImplementation(() => {
            throw errorExpected;
          });
        mockFileStorageLibrary.saveContentIntoFile.calledWith(outputPath, processedImageContent);
        
        
        // Asset
        expect(async () => {
            await imageProcessor.processAndSaveImage(inputPath, outputPath);
          }).rejects.toThrow(errorExpected);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(1);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledWith(inputPath);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
    });

    it('should throw error during processing image', async ()=>{
        // Arrange
        const inputPath = 'image.jpg';
        const outputPath = '/uploaded-images/';
        const processedImageContent = "Processed image content";
        const errorMessage = ERROR_DURING_SAVING_FILE;
        const errorExpected = new Error(errorMessage);

        // Act
        mockImageProcessingLibrary.processImage.calledWith(inputPath).mockResolvedValue(processedImageContent)
        mockFileStorageLibrary.saveContentIntoFile.calledWith(outputPath, processedImageContent).mockImplementation(() => {
            throw errorExpected;
          });
        
        
        // Asset
        expect(async () => {
            await imageProcessor.processAndSaveImage(inputPath, outputPath);
          }).rejects.toThrow(errorExpected);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(1);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledWith(inputPath);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
    });

    it('should throw error because of no inputPath', () => {
        // Arrange
        const inputPath = '';
        const outputPath = '/uploaded-images/';
        const errorMessage = ERROR_NO_IMAGE;
        const expectedError = new Error(errorMessage);

        // Act
        
        
        // Assert
        expect(async () => {
            await imageProcessor.processAndSaveImage(inputPath, outputPath);
          }).rejects.toThrow(expectedError);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(0);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
    });

    it('should throw error because of no outputPath', () => {
        // Arrange
        const inputPath = 'image.jpg';
        const outputPath = ''
        const errorMessage = ERROR_NO_OUTPUT_PATH;
        const expectedError = new Error(errorMessage);

        // Act
        
        
        // Assert
        expect(async () => {
            await imageProcessor.processAndSaveImage(inputPath, outputPath);
          }).rejects.toThrow(expectedError);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(0);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
    });

    it('should throw error because of invalid image expression', () => {
        // Arrange
        const inputPath = 'image.png';
        const outputPath = '/uploaded-images/';
        const errorMessage = ERROR_IMG_MUST_JPG;
        const expectedError = new Error(errorMessage);

        // Act
        
        
        // Assert
        expect(async () => {
            await imageProcessor.processAndSaveImage(inputPath, outputPath);
          }).rejects.toThrow(expectedError);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(0);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
    });
})