import { FileStorageLibrary } from "../src/FileStorageLibrary";
import { ImageProcessingLibrary } from "../src/ImageProcessingLibrary";
import { ImageProcessor } from "../src/ImageProcessor"
import { mock, mockReset } from 'jest-mock-extended'
import { ERROR_DURING_PROCESS_IMAGE, ERROR_DURING_SAVING_FILE, ERROR_IMG_MUST_JPG, ERROR_NO_IMAGE, ERROR_NO_OUTPUT_PATH } from "../src/constants";

const mockImageProcessingLibrary = mock<ImageProcessingLibrary>();
const mockFileStorageLibrary = mock<FileStorageLibrary>();

describe('ImageProcessor', ()=>{
    let imageProcessor: ImageProcessor;
    //Common Arrange
    const inputPath = 'image.jpg';
    const processedImageContent = "Processed image content";
    const outputPath = '/uploaded-images/'

    beforeEach(()=>{
        mockReset(mockImageProcessingLibrary);
        mockReset(mockFileStorageLibrary);

        imageProcessor = new ImageProcessor(mockImageProcessingLibrary,mockFileStorageLibrary);
    })

    describe('Happy path', ()=>{
      it('should process and save image', async ()=>{

        // Act
        mockImageProcessingLibrary.processImage.calledWith(inputPath).mockResolvedValue(processedImageContent);
        mockFileStorageLibrary.saveContentIntoFile.calledWith(outputPath, processedImageContent);

        await imageProcessor.processAndSaveImage(inputPath, outputPath)
        
        
        // Assert
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(1);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledWith(inputPath);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(1);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledWith(outputPath, processedImageContent);
      });
    });

    describe("Error path(s)", ()=>{
      it('should throw error during processing image', async ()=>{
        // Arrange
        const errorMessage = ERROR_DURING_PROCESS_IMAGE;
        const errorExpected = new Error(errorMessage);

        // Act
        mockImageProcessingLibrary.processImage.calledWith(inputPath).mockImplementation(() => {
            throw errorExpected;
          });
        mockFileStorageLibrary.saveContentIntoFile.calledWith(outputPath, processedImageContent);
        
        
        // Assert
        expect(async () => {
            await imageProcessor.processAndSaveImage(inputPath, outputPath);
          }).rejects.toThrow(errorExpected);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(1);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledWith(inputPath);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
      });

      it('should throw error during saving into file content', async ()=>{
        // Arrange
        const errorMessage = ERROR_DURING_SAVING_FILE;
        const errorExpected = new Error(errorMessage);

        // Act
        mockImageProcessingLibrary.processImage.calledWith(inputPath).mockResolvedValue(processedImageContent)
        mockFileStorageLibrary.saveContentIntoFile.calledWith(outputPath, processedImageContent).mockImplementation(() => {
            throw errorExpected;
          });
        
        
        // Assert
        expect(async () => {
            await imageProcessor.processAndSaveImage(inputPath, outputPath);
          }).rejects.toThrow(errorExpected);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(1);
        expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledWith(inputPath);
        expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
      });
    });

    test.each`
      description | inputPath | outputPath | errorMessage
      ${'should throw error because of no inputPath'} | ${''} | ${'/uploaded-images/'} | ${ERROR_NO_IMAGE}
      ${'should throw error because of no outputPath'} | ${'image.jpg'} | ${''} | ${ERROR_NO_OUTPUT_PATH}
      ${'should throw error because of invalid image expression'} | ${'image.png'} | ${'/uploaded-images/'} | ${ERROR_IMG_MUST_JPG}

    `('$description', ({inputPath, outputPath, errorMessage}) =>{
      // Arrange
      const expectedError = new Error(errorMessage);

      // Assert
      expect(async () => {
        await imageProcessor.processAndSaveImage(inputPath, outputPath);
      }).rejects.toThrow(expectedError);
      expect(mockImageProcessingLibrary.processImage).toHaveBeenCalledTimes(0);
      expect(mockFileStorageLibrary.saveContentIntoFile).toHaveBeenCalledTimes(0);
    });
});